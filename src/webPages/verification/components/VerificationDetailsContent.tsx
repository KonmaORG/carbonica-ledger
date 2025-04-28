import React from "react";
import { Progress } from "@/components/ui/progress";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationTimeline } from "./VerificationTimeline";
import { VerificationDocuments } from "./VerificationDocuments";
import { formatDateToLongForm, formatISODate } from "@/lib/utils";
import { VerificationRequest } from "../types/verificationTypes";

interface VerificationDetailsContentProps {
  request: VerificationRequest;
}

export const VerificationDetailsContent: React.FC<
  VerificationDetailsContentProps
> = ({ request }) => {
  const progress =
    request.verification.votes?.length > 0
      ? (request.verification.votes.filter((vote) => vote.signed === true)
          .length /
          request.verification.votes?.length) *
        100
      : 0;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Project ID</h3>
          <p>{request.project_id}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Submitted Date</h3>
          <p>{formatISODate(request.created_at)}</p>
        </div>
        {request.verification.votes.length > 0 &&
          request.verification.votes.map((vote) => (
            <div key={vote.vote_id}>
              <h3 className="text-sm font-medium text-gray-500 flex">
                Verifier
              </h3>
              <p>{vote.verifier_id}</p>
              <p>Vote: {vote.vote}</p>
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

      {request.verification.votes?.length &&
        request.verification.votes.map(
          (vote) =>
            vote.rejection_reason && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-md">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  Rejection Reason
                </h3>
                <p className="text-sm text-red-700">{vote.rejection_reason}</p>
              </div>
            )
        )}

      <VerificationTimeline request={request} />
    </div>
  );
};
