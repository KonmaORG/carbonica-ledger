
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { VerificationRequest } from '../types/verificationTypes';

interface VerificationStatusBadgeProps {
  status: VerificationRequest['status'];
}

export const VerificationStatusBadge = ({ status }: VerificationStatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case 'in_review':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          In Review
        </Badge>
      );
    case 'approved':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};
