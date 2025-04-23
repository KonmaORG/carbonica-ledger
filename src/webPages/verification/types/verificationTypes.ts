export interface VerificationRequest {
  id: string;
  projectId: string;
  title: string;
  submittedDate: string;
  status: "pending" | "in_review" | "approved" | "rejected";
  progress: number;
  verifier?: string;
  expectedCompletion?: string;
  rejectionReason?: string;
  // Required fields from the main model
  createdAt: string;
  updatedAt: string;
  developerId: string;
  version: number;
  documents: VerificationDocument[];
  timeline: VerificationEvent[];
  // Optional field that may be present in some interfaces
  verifierId?: string;
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
