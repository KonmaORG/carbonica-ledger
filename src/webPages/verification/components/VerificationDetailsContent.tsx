import React from "react";
import { Progress } from "@/components/ui/progress";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationRequest } from "@/types/model";
import { VerificationTimeline } from "./VerificationTimeline";
import { VerificationDocuments } from "./VerificationDocuments";
import { formatDateToLongForm, formatISODate } from "@/lib/utils";

interface VerificationDetailsContentProps {
  request: VerificationRequest;
}

export const VerificationDetailsContent: React.FC<
  VerificationDetailsContentProps
> = ({ request }) => {
  const progress =
    request.verification[0].verifiers.length > 0
      ? (request.verification[0].verifiers.filter(
          (item) => item.signed === true
        ).length /
          request.verification[0].verifiers.length) *
        100
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Project ID</h3>
          <p>{request.id}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Submitted Date</h3>
          <p>{formatISODate(request.created_at)}</p>
        </div>
        {request.verification[0].verifiers.length > 0 &&
          request.verification[0].verifiers.map((verifier, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium text-gray-500">Verifier</h3>
              <p>{verifier.verifier}</p>
            </div>
          ))}
        {request.estimatedCompletion && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Expected Completion
            </h3>
            <p>{formatDateToLongForm(request.estimatedCompletion)}</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Verification Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <VerificationDocuments documents={request.documents} />

      {request.verification[0].rejectionReason && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Rejection Reason
          </h3>
          <p className="text-sm text-red-700">
            {request.verification[0].rejectionReason}
          </p>
        </div>
      )}

      <VerificationTimeline request={request} />
    </div>
  );
};
