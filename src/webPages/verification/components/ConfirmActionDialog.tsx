
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface ConfirmActionDialogProps {
  action: 'approve' | 'reject' | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isSubmitting: boolean;
  rejectionReason?: string;
  setRejectionReason?: (reason: string) => void;
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  action,
  isOpen,
  onOpenChange,
  onConfirm,
  isSubmitting,
  rejectionReason = '',
  setRejectionReason = () => {}
}) => {
  if (!action) return null;

  const isRejection = action === 'reject';
  
  const dialogTitle = isRejection 
    ? "Reject Verification Request" 
    : "Approve Verification Request";
    
  const dialogDescription = isRejection
    ? "This will reject the verification request. This action cannot be undone."
    : "This will approve the verification request and issue carbon credits to the project.";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {isRejection && (
          <div className="py-4">
            <label htmlFor="rejection-reason" className="block text-sm font-medium mb-2">
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
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitting || (isRejection && !rejectionReason)}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRejection ? 'Reject' : 'Approve'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
