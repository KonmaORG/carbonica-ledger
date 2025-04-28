"use client";
import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { sign } from "@/lib/cardanoTx/utils";
import { useCardano } from "@/contexts/cardanoContext";
import { supabase } from "@/lib/supabase";
import { acceptProject } from "@/lib/cardanoTx/registry";
import { User } from "@supabase/supabase-js";
import { set } from "date-fns";

interface ValidatorActionsProps {
  request: VerificationRequest;
  user: User | null;
}

export default function ValidatorActions({
  request,
  user,
}: ValidatorActionsProps) {
  if (!user) {
    throw new Error("User not authenticated");
  }
  const [walletconnection] = useCardano();
  const [submitting, setSubmitting] = useState(false);
  const yesVotes = request.verification.votes.filter(
    (vote) => vote.vote === "Yes"
  ).length;
  const noVotes = request.verification.votes.filter(
    (vote) => vote.vote === "No"
  ).length;
  const vote_id = request.verification.votes.find(
    (vote) => vote.verifier_id === user.id
  )?.vote_id;
  async function signTx() {
    try {
      setSubmitting(true);
      const witness_set = await sign(
        request.verification.unsignedTx,
        walletconnection
      );

      const { error } = await supabase
        .from("votes")
        .update({
          witness_set,
        })
        .eq("vote_id", vote_id);

      if (error) {
        throw new Error(`Failed to Sign Transaction: ${error.message}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="flex flex-wrap gap-3">
      {yesVotes > noVotes ? (
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={signTx}
          disabled={request.status === "approved" || submitting}
        >
          <Check className="mr-2 h-4 w-4" />
          Sign
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={signTx}
          disabled={request.status === "rejected" || submitting}
        >
          <X className="mr-2 h-4 w-4" />
          Sign
        </Button>
      )}
    </div>
  );
}
