"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { VerificationRequest } from "../types/verificationTypes";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationDetailsDialog } from "./VerificationDetailsDialog";
import { formatISODate } from "@/lib/utils";

interface VerificationRequestCardProps {
  request: VerificationRequest;
}

export const VerificationRequestCard = ({
  request,
}: VerificationRequestCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const progress =
    request.verification[0].verifiers[0].verifier !== null
      ? (request.verification[0].verifiers.filter(
          (item) => item.signed === true
        ).length /
          request.verification[0].verifiers.length) *
        100
      : 0;
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <p className="text-sm text-gray-500">
              Submitted: {formatISODate(request.created_at)}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <VerificationStatusBadge status={request.status} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Verification Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {request.verification[0].verifiers[0].verifier !== null &&
          request.verification[0].verifiers.map((verifier, index) => (
            <div key={"index"} className="mt-4 text-sm">
              <span className="text-gray-600">Verifier: </span>
              <span className="font-medium">{verifier.verifier}</span>
            </div>
          ))}

        <div className="mt-1 text-sm">
          <span className="text-gray-600">Expected Completion: </span>
          <span className="font-medium">{request.estimatedCompletion}</span>
        </div>

        {request.verification[0].rejectionReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-800">
            <p className="font-medium mb-1">Rejection Reason:</p>
            <p>{request.verification[0].rejectionReason}</p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDetailsOpen(true)}
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>

      <VerificationDetailsDialog
        request={request}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </Card>
  );
};
