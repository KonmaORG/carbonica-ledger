import React from "react";
import { VerificationRequest } from "../types/verificationTypes";

interface VerificationTimelineProps {
  request: VerificationRequest;
}

export const VerificationTimeline: React.FC<VerificationTimelineProps> = ({
  request,
}) => {
  return (
    <div className="rounded-md bg-gray-50 p-4">
      <h3 className="text-sm font-medium mb-2">Verification Timeline</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center justify-between">
          <span>Submission</span>
          <span className="text-green-600 font-medium">Completed</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Technical Verification</span>
          <span
            className={`font-medium ${
              request.progress >= 50 ? "text-green-600" : "text-gray-400"
            }`}
          >
            {request.progress >= 50 ? "Completed" : "Pending"}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span>Final Decision</span>
          <span
            className={`font-medium ${
              request.progress === 100 ? "text-green-600" : "text-gray-400"
            }`}
          >
            {request.progress === 100 ? "Completed" : "Pending"}
          </span>
        </li>
      </ul>
    </div>
  );
};
