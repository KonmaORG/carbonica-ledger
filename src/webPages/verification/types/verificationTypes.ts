import { ProjectDocument } from "@/types/project";

export interface VerificationRequest {
  project_id: string;
  created_at: string;
  title: string;
  type: string;
  location: string;
  country: string;
  startDate: string;
  estimatedCompletion: string;
  emissionsTarget: string;
  description: string;
  txHash: string;
  user_id: string;
  documents: ProjectDocument[];
  status: string;
  verification: {
    verification_id: string;
    credits: number | null;
    unsignedTx: string | null;
    txHash: string | null;
    timeline?: string | null;
    votes: requestVotes[];
  };
}

export interface requestVotes {
  vote_id: string;
  verification_id: string;
  verifier_id: string;
  vote: "Yes" | "No";
  signed: boolean;
  rejection_reason: string | null;
  created_at: string;
  user: VerificationUser;
}
export interface VerificationUser {
  user_id: string;
  name: string;
  role: string;
  address: string;
}
export interface VerificationDocument {
  id: string;
  verificationId: string;
  name: string;
  fileUrl: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

export interface VerificationEvent {
  id: string;
  verificationId: string;
  timestamp: string;
  eventType:
    | "submission"
    | "assignment"
    | "review"
    | "request_changes"
    | "approval"
    | "rejection";
  message: string;
  userId: string;
  userName?: string;
  metadata?: Record<string, any>;
}
