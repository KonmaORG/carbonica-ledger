import React from "react";
import { VerificationRequest } from "../types/verificationTypes";
import { VerificationRequestCard } from "./VerificationRequestCard";
import { UTxO } from "@lucid-evolution/lucid";

interface VerificationRequestsListProps {
  requests: { data: VerificationRequest; project: UTxO }[];
}
// export const VerificationRequestCard = (request: UTxO) => {
export const VerificationRequestsList: React.FC<
  VerificationRequestsListProps
> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500">
        No verification requests found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request, index) => (
        <VerificationRequestCard request={request} key={index} />
      ))}
    </div>
  );
};
