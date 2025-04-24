import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { User } from "@supabase/supabase-js";

interface ValidatorVoteProps {
  request: VerificationRequest;
  onAction: (action: "yes" | "no") => void;
  user: User | null;
}

export const ValidatorVote: React.FC<ValidatorVoteProps> = ({
  request,
  onAction,
  user,
}) => {
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
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={() => onAction("yes")}
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
          onClick={() => onAction("no")}
          disabled={hasVoted}
        >
          <X className="mr-2 h-4 w-4" />
          No
          <span className="text-sm text-gray-600">({noVotes})</span>
        </Button>
      </div>
    </div>
  );
};
