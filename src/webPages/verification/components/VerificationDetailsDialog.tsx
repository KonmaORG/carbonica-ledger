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
import { VerificationRequest } from "@/types/model";
import { useToast } from "@/hooks/use-toast";
import { VerificationDetailsContent } from "./VerificationDetailsContent";
import { ValidatorActions } from "./ValidatorActions";
import { ConfirmActionDialog } from "./ConfirmActionDialog";
import { useVerification } from "@/contexts/VerificationContext";

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
  const { approveVerification, rejectVerification } = useVerification();
  const [confirmAction, setConfirmAction] = React.useState<
    "approve" | "reject" | null
  >(null);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");

  const handleAction = async (action: "approve" | "reject") => {
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const executeAction = async () => {
    setIsSubmitting(true);

    try {
      if (confirmAction === "approve") {
        await approveVerification(request.id);
      } else if (confirmAction === "reject") {
        if (!rejectionReason) {
          toast({
            title: "Validation Error",
            description: "Please provide a reason for rejection",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        await rejectVerification(request.id, rejectionReason);
      }

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
            <DialogTitle className="text-xl">{request.title}</DialogTitle>
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
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
      />
    </>
  );
};
