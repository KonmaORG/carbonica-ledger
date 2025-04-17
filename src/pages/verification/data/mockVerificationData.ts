
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
    expectedCompletion: "Jun 25, 2023",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T15:45:00Z",
    developerId: "u1",
    version: 1,
    documents: [
      {
        id: "d1",
        verificationId: "v1",
        name: "Project Design Document",
        fileUrl: "/files/pdd_solar_rajasthan.pdf",
        fileType: "pdf",
        uploadedBy: "u1",
        uploadedAt: "2023-05-15T10:30:00Z",
        description: "Complete project design documentation"
      }
    ],
    timeline: [
      {
        id: "e1",
        verificationId: "v1",
        timestamp: "2023-05-15T10:30:00Z",
        eventType: "submission",
        message: "Verification request submitted",
        userId: "u1",
        userName: "Alice Chen"
      }
    ]
  },
  {
    id: "v2",
    projectId: "6",
    projectName: "Agricultural Methane Capture Program",
    submittedDate: "May 20, 2023",
    status: "pending",
    progress: 10,
    createdAt: "2023-05-20T09:00:00Z",
    updatedAt: "2023-05-20T09:00:00Z",
    developerId: "u1",
    version: 1,
    documents: [],
    timeline: [
      {
        id: "e5",
        verificationId: "v2",
        timestamp: "2023-05-20T09:00:00Z",
        eventType: "submission",
        message: "Verification request submitted",
        userId: "u1",
        userName: "Alice Chen"
      }
    ]
  },
  {
    id: "v3",
    projectId: "7",
    projectName: "Afforestation Project in Kenya",
    submittedDate: "Apr 12, 2023",
    status: "approved",
    progress: 100,
    verifier: "GreenCert International",
    createdAt: "2023-04-12T09:00:00Z",
    updatedAt: "2023-04-30T14:20:00Z",
    developerId: "u1",
    version: 1,
    documents: [],
    timeline: [
      {
        id: "e7",
        verificationId: "v3",
        timestamp: "2023-04-12T09:00:00Z",
        eventType: "submission",
        message: "Verification request submitted",
        userId: "u1",
        userName: "Alice Chen"
      }
    ]
  },
  {
    id: "v4",
    projectId: "8",
    projectName: "Waste-to-Energy Facility",
    submittedDate: "Apr 5, 2023",
    status: "rejected",
    progress: 100,
    verifier: "EcoAudit Partners",
    rejectionReason: "Insufficient documentation for emissions baseline calculation",
    createdAt: "2023-04-05T11:30:00Z",
    updatedAt: "2023-04-20T16:45:00Z",
    developerId: "u1",
    version: 1,
    documents: [],
    timeline: [
      {
        id: "e9",
        verificationId: "v4",
        timestamp: "2023-04-05T11:30:00Z",
        eventType: "submission",
        message: "Verification request submitted",
        userId: "u1",
        userName: "Alice Chen"
      }
    ]
  }
];
