
// User-related type definitions
export interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string;
  avatarUrl: string;
  joinDate: string;
  totalCredits: number;
  activeCredits: number;
  retiredCredits: number;
  verifiedProjects: number;
}

export interface CreditTransaction {
  id: string;
  date: string;
  type: string;
  project: string;
  amount: number;
  recipient?: string;
  status: string;
}
