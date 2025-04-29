"use client";
import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { requestVotes, VerificationRequest } from "../types/verificationTypes";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { TxSignBuilder } from "@lucid-evolution/lucid";
import { acceptProject, rejectProject } from "@/lib/cardanoTx/registry";
import { useCardano } from "@/contexts/cardanoContext";
import { toast } from "@/hooks/use-toast";

interface ValidatorVoteProps {
  request: VerificationRequest;
  user: User | null;
}

export default function ValidatorVote({ request, user }: ValidatorVoteProps) {
  const [walletConnection] = useCardano();
  const [isSubmitting, setSubmitting] = useState({ Yes: false, No: false });
  const hasVoted = user?.id
    ? request.verification?.votes?.some(
        (vote) => vote.verifier_id === user.id
      ) || false
    : false;

  const yesVotes =
    request.verification?.votes?.filter((vote) => vote.vote === "Yes").length ||
    0;

  const noVotes =
    request.verification?.votes?.filter((vote) => vote.vote === "No").length ||
    0;

  const handleVote = async (action: "Yes" | "No") => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    if (!walletConnection.lucid || !walletConnection.wallet) {
      throw new Error("Wallet not connected");
    }
    try {
      setSubmitting((prev) => ({ ...prev, [action]: true }));
      const verificationId = request.verification.verification_id;
      const projectId = request.project_id;
      const verifierId = user.id;
      const voteToStore = {
        verification_id: verificationId,
        verifier_id: verifierId,
        vote: action,
        signed: false,
      };

      // Append the new verifier to the existing array (or start a new array if null)

      let yesVotes = request.verification.votes.filter(
        (vote) => vote.vote === "Yes"
      ).length;
      let noVotes = request.verification.votes.filter(
        (vote) => vote.vote === "No"
      ).length;
      const totalVotes = yesVotes + noVotes + 1; // Include the new vote
      action === "Yes" ? yesVotes++ : noVotes++;
      // Determine if status should be updated
      const shouldUpdateStatus =
        totalVotes === 5 || yesVotes >= 3 || noVotes >= 3;
      let Tx: TxSignBuilder | null = null;

      const { data: storedVote, error } = await supabase
        .from("votes")
        .insert([voteToStore]).select(`
            vote_id,
            verifier_id,
            signed,
            vote,
            witness_set,
            rejection_reason,
            created_at,  users (
            user_id,
            name,
            role,
            address
            )`);
      if (error) {
        throw new Error(`Failed to update verifiers: ${error.message}`);
      }
      if (shouldUpdateStatus) {
        // creating transaction
        if (yesVotes > noVotes) {
          Tx = await acceptProject(
            walletConnection,
            [
              ...request.verification.votes,
              ...(storedVote as unknown[] as requestVotes[]),
            ],
            request.txHash
          );
        } else {
          Tx = await rejectProject(
            walletConnection,
            [
              ...request.verification.votes,
              ...(storedVote as unknown[] as requestVotes[]),
            ],
            request.txHash
          );
        }

        const { error: projectError } = await supabase
          .from("projects")
          .update({
            status: "in_review",
          })
          .eq("project_id", projectId);
        const { error: verifierError } = await supabase
          .from("verification")
          .update({
            status: "in_review",
            unsignedTx: Tx?.toCBOR(),
          })
          .eq("verification_id", verificationId);

        if (projectError) {
          throw new Error(
            `Failed to update project: ${projectError.message}. Verification update was reverted.`
          );
        }
        if (verifierError) {
          throw new Error(
            `Failed to update project: ${verifierError.message}. Verification update was reverted.`
          );
        }
        console.log("Verifier updated successfully");
        toast({
          title: `Voted Successfully`,
          description: `Stored vote as: ${action}`,
        });
      }

      // setConfirmAction("approve");
      // setIsConfirmOpen(true);
    } catch (error) {
      console.error("Error in handleVote:", error);
    } finally {
      setSubmitting((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={() => handleVote("Yes")}
          disabled={hasVoted || isSubmitting.Yes || isSubmitting.Yes}
        >
          <Check className="mr-2 h-4 w-4" />
          {isSubmitting.Yes ? "Voting..." : "Yes"}
          <span className="text-sm text-gray-600">({yesVotes})</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={() => handleVote("No")}
          disabled={hasVoted || isSubmitting.No || isSubmitting.Yes}
        >
          <X className="mr-2 h-4 w-4" />
          {isSubmitting.No ? "Voting..." : "No"}
          <span className="text-sm text-gray-600">({noVotes})</span>
        </Button>
      </div>
    </div>
  );
}
