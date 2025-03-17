import React from "react";
import { Progress } from "@/components/ui/progress";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationRequest } from "../types/verificationTypes";
import { VerificationTimeline } from "./VerificationTimeline";

interface VerificationDetailsContentProps {
  request: VerificationRequest;
}

export const VerificationDetailsContent: React.FC<
  VerificationDetailsContentProps
> = ({ request }) => {
  return (
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
            <h3 className="text-sm font-medium text-gray-500">
              Expected Completion
            </h3>
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
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Rejection Reason
          </h3>
          <p className="text-sm text-red-700">{request.rejectionReason}</p>
        </div>
      )}

      <VerificationTimeline request={request} />
    </div>
  );
};
