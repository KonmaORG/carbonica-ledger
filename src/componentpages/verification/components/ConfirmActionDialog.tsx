import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmActionDialogProps {
  action: "approve" | "reject" | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  action,
  isOpen,
  onOpenChange,
  onConfirm,
  isSubmitting,
}) => {
  const actionLabels = {
    approve: "Approve Request",
    reject: "Reject Request",
  };

  const actionDescriptions = {
    approve:
      "This will approve the verification request and sign the transaction on-chain.",
    reject:
      "This will reject the verification request and sign the transaction on-chain.",
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm {action && actionLabels[action]}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action && actionDescriptions[action]}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
          >
            {isSubmitting ? "Processing..." : "Confirm & Sign"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
