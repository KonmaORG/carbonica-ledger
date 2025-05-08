"use client";
import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { sign, submitTxMultiTx } from "@/lib/cardanoTx/utils";
import { useCardano } from "@/contexts/cardanoContext";
import { supabase } from "@/lib/supabase";
import { acceptProject } from "@/lib/cardanoTx/registry";
import { User } from "@supabase/supabase-js";
import { set } from "date-fns";
import { toast } from "@/hooks/use-toast";

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
  const isSigned = request.verification.votes.some(
    (vote) => vote.verifier_id === user.id && vote.signed
  );

  const yesVotes = request.verification.votes.filter(
    (vote) => vote.vote === "Yes"
  ).length;
  const noVotes = request.verification.votes.filter(
    (vote) => vote.vote === "No"
  ).length;
  const vote_id = request.verification.votes.find(
    (vote) => vote.verifier_id === user.id
  )?.vote_id;
  async function signTx(action: "Yes" | "No") {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      setSubmitting(true);
      const witness_set = await sign(
        request.verification.unsignedTx,
        walletconnection
      );

      const { error } = await supabase
        .from("votes")
        .update({
          witness_set,
          signed: true,
        })
        .eq("vote_id", vote_id);

      if (error) {
        throw new Error(`Failed to Sign Transaction: ${error.message}`);
      }
      request.verification.votes.forEach((vote) => {
        if (vote.verifier_id === user.id) {
          vote.witness_set = witness_set;
        }
      });
      const sameVotes = request.verification.votes.filter(
        (vote) => vote.vote === action
      );
      const isAllSigned = sameVotes.every((vote) => vote.witness_set !== "");
      if (isAllSigned) {
        const txHash = await submitTxMultiTx(
          request.verification.unsignedTx,
          sameVotes,
          walletconnection
        );
        const { error } = await supabase
          .from("verification")
          .update({
            txHash,
            status: "approved",
          })
          .eq("verification_id", request.verification.verification_id);
        if (error) {
          throw new Error(`Failed to Store Transaction: ${error.message}`);
        }
        toast({
          title: "Signed & Submitted Transaction",
          description: `Transaction has been signed & submitted. \n tx: ${txHash}`,
        });
        return;
      }
      toast({
        title: "Signed Transaction",
        description: "Transaction has been signed.",
      });
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
          onClick={() => signTx("Yes")}
          disabled={request.status === "approved" || submitting || isSigned}
        >
          <Check className="mr-2 h-4 w-4" />
          {submitting ? "Signing..." : "Sign"}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={() => signTx("No")}
          disabled={request.status === "rejected" || submitting || isSigned}
        >
          <X className="mr-2 h-4 w-4" />
          {submitting ? "Signing..." : "Sign"}
        </Button>
      )}
    </div>
  );
}
