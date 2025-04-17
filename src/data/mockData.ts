
import { 
  User, 
  Project, 
  VerificationRequest, 
  VerificationDocument, 
  VerificationEvent, 
  CreditEntry, 
  CreditTransaction 
} from '../types/model';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alice Chen",
    company: "EcoTech Solutions",
    email: "alice@ecotech.com",
    role: "developer",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    joinDate: "Jan 10, 2022",
    totalCredits: 35000,
    activeCredits: 25000,
    retiredCredits: 10000,
    verifiedProjects: 3,
    createdAt: "2022-01-10T12:00:00Z",
    updatedAt: "2023-05-15T09:30:00Z"
  },
  {
    id: "u2",
    name: "Marcus Johnson",
    company: "ClimateVerify Ltd.",
    email: "marcus@climateverify.com",
    role: "verifier",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "Mar 5, 2021",
    totalCredits: 0,
    activeCredits: 0,
    retiredCredits: 0,
    verifiedProjects: 12,
    createdAt: "2021-03-05T10:15:00Z",
    updatedAt: "2023-06-01T14:20:00Z"
  },
  {
    id: "u3",
    name: "Sophia Patel",
    company: "GreenCorp",
    email: "sophia@greencorp.com",
    role: "buyer",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    joinDate: "Nov 20, 2022",
    totalCredits: 18000,
    activeCredits: 13000,
    retiredCredits: 5000,
    verifiedProjects: 0,
    createdAt: "2022-11-20T09:45:00Z",
    updatedAt: "2023-07-12T11:05:00Z"
  }
];

// Mock Projects
export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Amazon Rainforest Conservation",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 15, 2023",
    status: "verified",
    credits: 25000,
    thumbnailUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Conservation of 5000 acres of Amazon rainforest to prevent deforestation and protect biodiversity.",
    developer: "u1",
    verificationId: "v3",
    methodology: "VM0015",
    verifier: "u2",
    verificationDate: "Apr 12, 2023",
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-04-12T15:30:00Z"
  },
  {
    id: "p2",
    title: "Solar Farm Development in Rajasthan",
    type: "Renewable Energy",
    location: "India",
    startDate: "May 15, 2023",
    status: "pending_verification",
    credits: 18000,
    thumbnailUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Development of a 50MW solar farm in Rajasthan, India to replace coal-based electricity generation.",
    developer: "u1",
    verificationId: "v1",
    methodology: "ACM0002",
    createdAt: "2023-05-15T10:15:00Z",
    updatedAt: "2023-05-15T10:15:00Z"
  }
];

// Mock Verification Requests with detailed timeline events and documents
export const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "v1",
    projectId: "p2",
    projectName: "Solar Farm Development in Rajasthan",
    submittedDate: "May 15, 2023",
    status: "in_review",
    progress: 60,
    verifierId: "u2",
    verifier: "ClimateVerify Ltd.",
    expectedCompletion: "Jun 25, 2023",
    developerId: "u1",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T15:45:00Z",
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
      },
      {
        id: "d2",
        verificationId: "v1",
        name: "Emissions Calculation Spreadsheet",
        fileUrl: "/files/emissions_calc_rajasthan.xlsx",
        fileType: "xlsx",
        uploadedBy: "u1",
        uploadedAt: "2023-05-15T10:35:00Z",
        description: "Detailed calculation of emissions reduction"
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
      },
      {
        id: "e2",
        verificationId: "v1",
        timestamp: "2023-05-18T09:15:00Z",
        eventType: "assignment",
        message: "Assigned to ClimateVerify Ltd.",
        userId: "admin",
        userName: "System Administrator"
      },
      {
        id: "e3",
        verificationId: "v1",
        timestamp: "2023-05-20T15:45:00Z",
        eventType: "review",
        message: "Initial review completed, additional documentation requested",
        userId: "u2",
        userName: "Marcus Johnson"
      }
    ]
  },
  {
    id: "v3",
    projectId: "p1",
    projectName: "Amazon Rainforest Conservation",
    submittedDate: "Apr 12, 2023",
    status: "approved",
    progress: 100,
    verifierId: "u2",
    verifier: "ClimateVerify Ltd.",
    developerId: "u1",
    createdAt: "2023-04-12T09:00:00Z",
    updatedAt: "2023-04-30T14:20:00Z",
    version: 1,
    documents: [
      {
        id: "d5",
        verificationId: "v3",
        name: "Project Design Document",
        fileUrl: "/files/pdd_amazon.pdf",
        fileType: "pdf",
        uploadedBy: "u1",
        uploadedAt: "2023-04-12T09:00:00Z",
        description: "Complete project design documentation"
      }
    ],
    timeline: [
      {
        id: "e7",
        verificationId: "v3",
        timestamp: "2023-04-12T09:00:00Z",
        eventType: "submission",
        message: "Verification request submitted",
        userId: "u1",
        userName: "Alice Chen"
      },
      {
        id: "e8",
        verificationId: "v3",
        timestamp: "2023-04-13T11:30:00Z",
        eventType: "assignment",
        message: "Assigned to ClimateVerify Ltd.",
        userId: "admin",
        userName: "System Administrator"
      },
      {
        id: "e9",
        verificationId: "v3",
        timestamp: "2023-04-30T14:20:00Z",
        eventType: "approval",
        message: "Verification approved. 25,000 credits issued.",
        userId: "u2",
        userName: "Marcus Johnson"
      }
    ]
  }
];

// Mock Credit Entries
export const MOCK_CREDIT_ENTRIES: CreditEntry[] = [
  {
    id: "c1",
    creditId: "CRD-001-2023-A",
    projectId: "p1",
    projectName: "Amazon Rainforest Conservation",
    projectType: "Forest Conservation",
    location: "Brazil",
    quantity: 25000,
    vintage: "2023",
    status: 'active',
    issuanceDate: "Apr 30, 2023",
    lastActionDate: "Apr 30, 2023",
    owner: "u1",
    verificationId: "v3",
    serialNumber: "BRA-FC-2023-00001-00025000",
    createdAt: "2023-04-30T14:30:00Z",
    updatedAt: "2023-04-30T14:30:00Z"
  },
  {
    id: "c2",
    creditId: "CRD-001-2023-B",
    projectId: "p1",
    projectName: "Amazon Rainforest Conservation",
    projectType: "Forest Conservation",
    location: "Brazil",
    quantity: 5000,
    vintage: "2023",
    status: 'retired',
    issuanceDate: "Apr 30, 2023",
    lastActionDate: "May 20, 2023",
    owner: "u3",
    verificationId: "v3",
    serialNumber: "BRA-FC-2023-00025001-00030000",
    createdAt: "2023-04-30T14:30:00Z",
    updatedAt: "2023-05-20T11:15:00Z"
  }
];

// Mock Credit Transactions
export const MOCK_CREDIT_TRANSACTIONS: CreditTransaction[] = [
  {
    id: "t1",
    date: "Apr 30, 2023",
    type: "issuance",
    projectId: "p1",
    project: "Amazon Rainforest Conservation",
    creditId: "CRD-001-2023-A",
    amount: 25000,
    senderId: "system",
    recipientId: "u1",
    status: "completed",
    transactionHash: "0x123456789abcdef",
    createdAt: "2023-04-30T14:30:00Z",
    updatedAt: "2023-04-30T14:30:00Z"
  },
  {
    id: "t2",
    date: "May 10, 2023",
    type: "transfer",
    projectId: "p1",
    project: "Amazon Rainforest Conservation",
    creditId: "CRD-001-2023-B",
    amount: 5000,
    senderId: "u1",
    recipientId: "u3",
    recipient: "Sophia Patel",
    status: "completed",
    transactionHash: "0x234567890abcdef",
    createdAt: "2023-05-10T10:15:00Z",
    updatedAt: "2023-05-10T10:15:00Z"
  },
  {
    id: "t3",
    date: "May 20, 2023",
    type: "retirement",
    projectId: "p1",
    project: "Amazon Rainforest Conservation",
    creditId: "CRD-001-2023-B",
    amount: 5000,
    senderId: "u3",
    status: "completed",
    transactionHash: "0x3456789abcdef01",
    createdAt: "2023-05-20T11:15:00Z",
    updatedAt: "2023-05-20T11:15:00Z"
  }
];
