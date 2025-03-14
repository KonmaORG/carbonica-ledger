import { VerificationRequest } from "../types/verificationTypes";

export const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "e894261045956cea517162f93b02c5d8a84296e1c54b5e16470e958392bf2be0",
    projectId: "3",
    projectName: "Solar Farm Development in Rajasthan",
    submittedDate: "May 15, 2023",
    status: "in_review",
    progress: 60,
    verifier: "ClimateVerify Ltd.",
    expectedCompletion: "Jun 25, 2023",
  },
  {
    id: "e77fe0899a1894396e51237b7fa5238118155c6f5ea1cdd9f9398840f6586f74",
    projectId: "6",
    projectName: "Agricultural Methane Capture Program",
    submittedDate: "May 20, 2023",
    status: "pending",
    progress: 10,
  },
  // {
  //   id: "v3",
  //   projectId: "7",
  //   projectName: "Afforestation Project in Kenya",
  //   submittedDate: "Apr 12, 2023",
  //   status: "approved",
  //   progress: 100,
  //   verifier: "GreenCert International"
  // },
  // {
  //   id: "v4",
  //   projectId: "8",
  //   projectName: "Waste-to-Energy Facility",
  //   submittedDate: "Apr 5, 2023",
  //   status: "rejected",
  //   progress: 100,
  //   verifier: "EcoAudit Partners",
  //   rejectionReason: "Insufficient documentation for emissions baseline calculation"
  // }
];
