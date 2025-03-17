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
import { toText, UTxO } from "@lucid-evolution/lucid";
import { KarbonDatum } from "@/types/datum";
import { useWallet } from "@/context/walletContext";
import { acceptProject, rejectProject } from "@/lib/transaction";

interface VerificationDetailsDialogProps {
  request: { data: VerificationRequest; project: UTxO; datum: KarbonDatum };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VerificationDetailsDialog = ({
  request,
  open,
  onOpenChange,
}: VerificationDetailsDialogProps) => {
  const { data, project, datum } = request;
  const { toast } = useToast();
  const [confirmAction, setConfirmAction] = React.useState<
    "approve" | "reject" | null
  >(null);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [walletConnection] = useWallet();
  const handleAction = async (action: "approve" | "reject") => {
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const executeAction = async () => {
    setIsSubmitting(true);

    try {
      // Simulate blockchain transaction
      let functionCallAction =
        confirmAction === "approve" ? acceptProject : rejectProject;
      const result = await functionCallAction(walletConnection, project);
      if (result.status !== "ok") {
        throw result.error;
      } else {
        const actionMessages = {
          approve: "Verification request approved successfully",
          reject: "Verification request rejected",
        };

        toast({
          title: "Transaction Successful",
          description: result.txHash,
        });

        setIsConfirmOpen(false);
        onOpenChange(false);
      }
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error || "Unknown error occured",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    datum && (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {toText(datum.asset_name)}
              </DialogTitle>
              <DialogDescription className="flex items-center justify-between">
                <span>Verification Request ID: {data.id}</span>
                <VerificationStatusBadge status={data.status} />
              </DialogDescription>
            </DialogHeader>

            <VerificationDetailsContent request={data} />

            <ValidatorActions request={data} onAction={handleAction} />

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
    )
  );
};
