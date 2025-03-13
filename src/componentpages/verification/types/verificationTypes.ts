
export interface VerificationRequest {
  id: string;
  projectId: string;
  projectName: string;
  submittedDate: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  progress: number;
  verifier?: string;
  expectedCompletion?: string;
  rejectionReason?: string;
}
