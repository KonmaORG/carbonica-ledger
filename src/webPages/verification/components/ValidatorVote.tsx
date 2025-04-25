"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { TxSignBuilder } from "@lucid-evolution/lucid";
import { acceptProject, rejectProject } from "@/lib/cardanoTx/registry";
import { useCardano } from "@/contexts/cardanoContext";

interface ValidatorVoteProps {
  request: VerificationRequest;
  user: User | null;
}

export default function ValidatorVote({ request, user }: ValidatorVoteProps) {
  const [walletConnection] = useCardano();
  const hasVoted = user?.id
    ? request.verification?.[0]?.verifiers?.some(
        (verifier) => verifier.verifier === user.id
      ) || false
    : false;

  const yesVotes =
    request.verification?.[0]?.verifiers?.filter(
      (verifier) => verifier.vote === "yes"
    ).length || 0;
  const noVotes =
    request.verification?.[0]?.verifiers?.filter(
      (verifier) => verifier.vote === "no"
    ).length || 0;

  const handleVote = async (action: "yes" | "no") => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const verificationId = request.verification[0].id;
    const projectId = request.id;
    const verifierId = user.id;
    const newVerifier = {
      verifier: verifierId,
      signed: false,
      vote: action,
    };

    // Append the new verifier to the existing array (or start a new array if null)
    const updatedVerifiers = request.verification[0].verifiers
      ? [...request.verification[0].verifiers, newVerifier]
      : [newVerifier];

    const totalVotes = updatedVerifiers.length;
    const yesVotes = updatedVerifiers.filter(
      (v: { vote: string }) => v.vote === "yes"
    ).length;
    const noVotes = updatedVerifiers.filter(
      (v: { vote: string }) => v.vote === "no"
    ).length;

    // Determine if status should be updated
    const shouldUpdateStatus =
      totalVotes === 5 || yesVotes >= 3 || noVotes >= 3;
    let Tx: TxSignBuilder | null = null;
    if (shouldUpdateStatus) {
      if (yesVotes > noVotes) {
        Tx = await acceptProject(walletConnection, request.txHash);
      } else {
        Tx = await rejectProject(walletConnection, request.txHash);
      }
    }
    // Update the verification table's verifiers array
    const { error } = await supabase
      .from("verification")
      .update({
        verifiers: updatedVerifiers,
        status: shouldUpdateStatus
          ? "in_review"
          : request.verification[0].status || "pending",
        unsignedTx: Tx?.toCBOR(),
      })
      .eq("id", verificationId);

    if (error) {
      throw new Error(`Failed to update verifiers: ${error.message}`);
    }
    if (shouldUpdateStatus) {
      const { error: projectError } = await supabase
        .from("projects")
        .update({
          status: "in_review",
        })
        .eq("id", projectId);

      if (projectError) {
        // Attempt to rollback the verification update
        const { error: rollbackError } = await supabase
          .from("verification")
          .update({
            verifiers: request.verification[0]?.verifiers || [],
            status: request.verification[0]?.status || "pending",
            updated_at: new Date().toISOString(),
          })
          .eq("id", verificationId);

        if (rollbackError) {
          console.error("Rollback failed:", rollbackError);
          throw new Error(
            `Failed to update project: ${projectError.message}. Rollback also failed, please contact support.`
          );
        }

        throw new Error(
          `Failed to update project: ${projectError.message}. Verification update was reverted.`
        );
      }
      console.log("Verifier updated successfully:", updatedVerifiers);
    }

    // setConfirmAction("approve");
    // setIsConfirmOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={() => handleVote("yes")}
          disabled={hasVoted}
        >
          <Check className="mr-2 h-4 w-4" />
          Yes
          <span className="text-sm text-gray-600">({yesVotes})</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={() => handleVote("no")}
          disabled={hasVoted}
        >
          <X className="mr-2 h-4 w-4" />
          No
          <span className="text-sm text-gray-600">({noVotes})</span>
        </Button>
      </div>
    </div>
  );
}
