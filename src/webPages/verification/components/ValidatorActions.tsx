"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { sign } from "@/lib/cardanoTx/utils";
import { useCardano } from "@/contexts/cardanoContext";
import { supabase } from "@/lib/supabase";
import { acceptProject } from "@/lib/cardanoTx/registry";

interface ValidatorActionsProps {
  request: VerificationRequest;
}

export default function ValidatorActions({ request }: ValidatorActionsProps) {
  const [walletconnection] = useCardano();
  const yesVotes = request.verification[0].verifiers.filter(
    (v: { vote: string }) => v.vote === "yes"
  ).length;
  const noVotes = request.verification[0].verifiers.filter(
    (v: { vote: string }) => v.vote === "no"
  ).length;

  async function signTx() {
    const partialSigned = await sign(
      request.verification[0].unsignedTx,
      walletconnection
    );

    const { error } = await supabase
      .from("verification")
      .update({
        unsignedTx: partialSigned,
      })
      .eq("id", request.verification[0].id);
    if (error) {
      throw new Error(`Failed to Sign Transaction: ${error.message}`);
    }
  }
  return (
    <div className="flex flex-wrap gap-3">
      {yesVotes > noVotes ? (
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={signTx}
          disabled={request.status === "approved"}
        >
          <Check className="mr-2 h-4 w-4" />
          Sign
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={signTx}
          disabled={request.status === "rejected"}
        >
          <X className="mr-2 h-4 w-4" />
          Sign
        </Button>
      )}
    </div>
  );
}
