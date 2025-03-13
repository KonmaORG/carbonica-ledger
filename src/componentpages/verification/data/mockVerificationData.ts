
import { VerificationRequest } from '../types/verificationTypes';

export const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "v1",
    projectId: "3",
    projectName: "Solar Farm Development in Rajasthan",
    submittedDate: "May 15, 2023",
    status: "in_review",
    progress: 60,
    verifier: "ClimateVerify Ltd.",
    expectedCompletion: "Jun 25, 2023"
  },
  {
    id: "v2",
    projectId: "6",
    projectName: "Agricultural Methane Capture Program",
    submittedDate: "May 20, 2023",
    status: "pending",
    progress: 10
  },
  {
    id: "v3",
    projectId: "7",
    projectName: "Afforestation Project in Kenya",
    submittedDate: "Apr 12, 2023",
    status: "approved",
    progress: 100,
    verifier: "GreenCert International"
  },
  {
    id: "v4",
    projectId: "8",
    projectName: "Waste-to-Energy Facility",
    submittedDate: "Apr 5, 2023",
    status: "rejected",
    progress: 100,
    verifier: "EcoAudit Partners",
    rejectionReason: "Insufficient documentation for emissions baseline calculation"
  }
];
