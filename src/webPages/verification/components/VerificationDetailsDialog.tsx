"use client";
import React, { useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { VerificationDetailsContent } from "./VerificationDetailsContent";
import { useVerification } from "@/contexts/VerificationContext";
// import ValidatorVote from "./ValidatorVote";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import { VerificationRequest } from "../types/verificationTypes";
import { supabase } from "@/lib/supabase";
const ValidatorVote = dynamic(() => import("./ValidatorVote"), {
  ssr: false,
});
const ValidatorActions = dynamic(() => import("./ValidatorActions"), {
  ssr: false,
});
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
  const { user } = useAuth();
  const { toast } = useToast();
  const { approveVerification, rejectVerification } = useVerification();
  const [isValidator, setIsValidator] = React.useState(false);
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
        await approveVerification(request.project_id);
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
        await rejectVerification(request.project_id, rejectionReason);
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

  useEffect(() => {
    async function fetchUsers() {
      if (!user) {
        return;
      }
      let { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      setIsValidator(userData.role === "validator");
    }
    fetchUsers();
  }, []);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl">{request.title}</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>Verification Request ID: {request.project_id}</span>
              <VerificationStatusBadge status={request.status} />
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <VerificationDetailsContent request={request} />
          </div>

          <div className="flex-shrink-0 pt-4 border-t">
            <DialogFooter className="mt-4">
              {/* validator role only */}

              {isValidator && request.status === "pending" && (
                <ValidatorVote request={request} user={user} />
              )}
              {isValidator && request.status === "in_review" && (
                <ValidatorActions request={request} user={user} />
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* <ConfirmActionDialog
        action={confirmAction}
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={executeAction}
        isSubmitting={isSubmitting}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
      /> */}
    </>
  );
};
