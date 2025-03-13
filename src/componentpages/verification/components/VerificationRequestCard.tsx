
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import { VerificationRequest } from '../types/verificationTypes';
import { VerificationStatusBadge } from './VerificationStatusBadge';

interface VerificationRequestCardProps {
  request: VerificationRequest;
}

export const VerificationRequestCard = ({ request }: VerificationRequestCardProps) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{request.projectName}</h3>
            <p className="text-sm text-gray-500">Submitted: {request.submittedDate}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <VerificationStatusBadge status={request.status} />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Verification Progress</span>
            <span className="font-medium">{request.progress}%</span>
          </div>
          <Progress value={request.progress} className="h-2" />
        </div>
        
        {request.verifier && (
          <div className="mt-4 text-sm">
            <span className="text-gray-600">Verifier: </span>
            <span className="font-medium">{request.verifier}</span>
          </div>
        )}
        
        {request.expectedCompletion && (
          <div className="mt-1 text-sm">
            <span className="text-gray-600">Expected Completion: </span>
            <span className="font-medium">{request.expectedCompletion}</span>
          </div>
        )}
        
        {request.rejectionReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-800">
            <p className="font-medium mb-1">Rejection Reason:</p>
            <p>{request.rejectionReason}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
