import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";

interface ValidatorActionsProps {
  request: VerificationRequest;
}

export const ValidatorActions: React.FC<ValidatorActionsProps> = ({
  request,
}) => {
  const yesVotes = request.verification[0].verifiers.filter(
    (v: { vote: string }) => v.vote === "yes"
  ).length;
  const noVotes = request.verification[0].verifiers.filter(
    (v: { vote: string }) => v.vote === "no"
  ).length;

  function signTx(action: "approve" | "reject") {
    console.log(`User voted: ${action}`);
  }
  return (
    <div className="flex flex-wrap gap-3">
      {yesVotes > noVotes ? (
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={() => signTx("approve")}
          disabled={request.status === "approved"}
        >
          <Check className="mr-2 h-4 w-4" />
          Sign
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={() => signTx("reject")}
          disabled={request.status === "rejected"}
        >
          <X className="mr-2 h-4 w-4" />
          Sign
        </Button>
      )}
    </div>
  );
};
