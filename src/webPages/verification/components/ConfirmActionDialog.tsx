"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmActionDialogProps {
  action: "approve" | "reject" | null;
  onConfirm: (response: "Yes" | "No") => Promise<void>;
  isSubmitting: { Yes: boolean; No: boolean };
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  data: { noVotes: number; yesVotes: number; hasVoted: boolean };
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  action,
  onConfirm,
  isSubmitting,
  rejectionReason,
  setRejectionReason,
  data,
}) => {
  const [open, setOpen] = useState(false);

  if (!action) return null;

  const isRejection = action === "reject";

  const dialogTitle = isRejection
    ? "Reject Verification Request"
    : "Approve Verification Request";

  const dialogDescription = isRejection
    ? "This will reject the verification request. This action cannot be undone."
    : "This will approve the verification request and issue carbon credits to the project.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant="outline" className="bg-red-50 hover:bg-red-100">
          <X className="mr-2 h-4 w-4" />
          {isSubmitting.No ? "Voting..." : "No"}
          <span className="text-sm text-gray-600">({data.noVotes})</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        {isRejection && (
          <div className="py-4">
            <label
              htmlFor="rejection-reason"
              className="block text-sm font-medium mb-2"
            >
              Reason for rejection
            </label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a detailed reason for the rejection"
              className="min-h-24"
            />
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting.Yes || isSubmitting.No}
          >
            Cancel
          </Button>
          <Button
            disabled={
              isSubmitting.Yes ||
              isSubmitting.No ||
              data.hasVoted ||
              (isRejection && !rejectionReason)
            }
            onClick={() => onConfirm(isRejection ? "No" : "Yes")}
          >
            {(isSubmitting.Yes || isSubmitting.No) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isRejection ? "Reject" : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
