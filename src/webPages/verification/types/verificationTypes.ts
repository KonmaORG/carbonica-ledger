import { ProjectDocument } from "@/types/project";

export interface VerificationRequest {
  id: string;
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
    id: string;
    credits: number | null;
    rejectionReason: string | null;
    unsignedTx: string | null;
    txHash: string | null;
    timeline?: string | null;
    verifiers: { verfier: string; signed: boolean }[];
  };
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
