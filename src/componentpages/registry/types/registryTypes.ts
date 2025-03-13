
// Registry type definitions
export interface CreditEntry {
  id: string;
  creditId: string;
  projectId: string;
  projectName: string;
  projectType: string;
  location: string;
  quantity: number;
  vintage: string;
  status: 'active' | 'transferred' | 'retired';
  issuanceDate: string;
  lastActionDate: string;
  owner: string;
}
