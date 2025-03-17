import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationRequest } from "../types/verificationTypes";
import { useToast } from "@/hooks/use-toast";
import { VerificationDetailsContent } from "./VerificationDetailsContent";
import { ValidatorActions } from "./ValidatorActions";
import { ConfirmActionDialog } from "./ConfirmActionDialog";

interface VerificationDetailsDialogProps {
  request: VerificationRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VerificationDetailsDialog = ({
  request,
  open,
  onOpenChange,
}: VerificationDetailsDialogProps) => {
  const { toast } = useToast();
  const [confirmAction, setConfirmAction] = React.useState<
    "approve" | "reject" | null
  >(null);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAction = async (action: "approve" | "reject") => {
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const executeAction = async () => {
    setIsSubmitting(true);

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // call Cardano function to approve or reject verification request based on `confirmAction`

      // Show success message
      const actionMessages = {
        approve: "Verification request approved successfully",
        reject: "Verification request rejected",
      };

      toast({
        title: "Transaction Successful",
        description: actionMessages[confirmAction!],
      });

      setIsConfirmOpen(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description:
          "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{request.projectName}</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>Verification Request ID: {request.id}</span>
              <VerificationStatusBadge status={request.status} />
            </DialogDescription>
          </DialogHeader>

          <VerificationDetailsContent request={request} />

          <ValidatorActions request={request} onAction={handleAction} />

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        action={confirmAction}
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={executeAction}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
