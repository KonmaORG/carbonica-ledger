
import React from 'react';
import { VerificationRequest } from '../types/verificationTypes';
import { VerificationRequestCard } from './VerificationRequestCard';

interface VerificationRequestsListProps {
  requests: VerificationRequest[];
}

export const VerificationRequestsList = ({ requests }: VerificationRequestsListProps) => {
  if (requests.length === 0) {
    return <p className="text-center py-8 text-gray-500">No verification requests found.</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <VerificationRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};
