
export interface ComplianceReport {
  id: string;
  title: string;
  period: string;
  status: 'compliant' | 'non_compliant' | 'pending';
  lastUpdated: string;
  score: number;
  auditor?: string;
  issues?: { severity: 'high' | 'medium' | 'low'; description: string }[];
}
