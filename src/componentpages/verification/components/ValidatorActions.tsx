import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";

interface ValidatorActionsProps {
  request: VerificationRequest;
  onAction: (action: "approve" | "reject") => void;
}

export const ValidatorActions: React.FC<ValidatorActionsProps> = ({
  request,
  onAction,
}) => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-sm font-medium mb-3">Validator Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100"
          onClick={() => onAction("approve")}
          disabled={request.status === "approved"}
        >
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100"
          onClick={() => onAction("reject")}
          disabled={request.status === "rejected"}
        >
          <X className="mr-2 h-4 w-4" />
          Reject
        </Button>
      </div>
    </div>
  );
};
