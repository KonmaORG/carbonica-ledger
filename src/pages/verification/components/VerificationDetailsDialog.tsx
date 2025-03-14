
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VerificationStatusBadge } from './VerificationStatusBadge';
import { VerificationRequest } from '../types/verificationTypes';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [confirmAction, setConfirmAction] = React.useState<'approve' | 'reject' | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAction = async (action: 'approve' | 'reject') => {
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const executeAction = async () => {
    setIsSubmitting(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      const actionMessages = {
        approve: "Verification request approved successfully",
        reject: "Verification request rejected"
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
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionLabels = {
    approve: "Approve Request",
    reject: "Reject Request"
  };

  const actionDescriptions = {
    approve: "This will approve the verification request and sign the transaction on-chain.",
    reject: "This will reject the verification request and sign the transaction on-chain."
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

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Project ID</h3>
                <p>{request.projectId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Submitted Date</h3>
                <p>{request.submittedDate}</p>
              </div>
              {request.verifier && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Verifier</h3>
                  <p>{request.verifier}</p>
                </div>
              )}
              {request.expectedCompletion && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Expected Completion</h3>
                  <p>{request.expectedCompletion}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verification Progress</span>
                <span className="font-medium">{request.progress}%</span>
              </div>
              <Progress value={request.progress} className="h-2" />
            </div>

            {request.rejectionReason && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                <h3 className="text-sm font-medium text-red-800 mb-1">Rejection Reason</h3>
                <p className="text-sm text-red-700">{request.rejectionReason}</p>
              </div>
            )}

            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="text-sm font-medium mb-2">Verification Timeline</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Submission</span>
                  <span className="text-green-600 font-medium">Completed</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Initial Review</span>
                  <span className={`font-medium ${request.progress >= 30 ? 'text-green-600' : 'text-gray-400'}`}>
                    {request.progress >= 30 ? 'Completed' : 'Pending'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Technical Verification</span>
                  <span className={`font-medium ${request.progress >= 60 ? 'text-green-600' : 'text-gray-400'}`}>
                    {request.progress >= 60 ? 'Completed' : 'Pending'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Final Decision</span>
                  <span className={`font-medium ${request.progress === 100 ? 'text-green-600' : 'text-gray-400'}`}>
                    {request.progress === 100 ? 'Completed' : 'Pending'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Validator Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="bg-green-50 hover:bg-green-100"
                  onClick={() => handleAction('approve')}
                  disabled={request.status === 'approved'}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100"
                  onClick={() => handleAction('reject')}
                  disabled={request.status === 'rejected'}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm {confirmAction && actionLabels[confirmAction]}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction && actionDescriptions[confirmAction]}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeAction}
              disabled={isSubmitting}
              className={
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }
            >
              {isSubmitting ? "Processing..." : "Confirm & Sign"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
