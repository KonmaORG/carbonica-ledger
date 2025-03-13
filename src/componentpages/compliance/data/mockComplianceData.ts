
import { ComplianceReport } from '../types/complianceTypes';

export const MOCK_COMPLIANCE_REPORTS: ComplianceReport[] = [
  {
    id: "r1",
    title: "Annual Carbon Offset Verification Report",
    period: "Jan 2023 - Dec 2023",
    status: 'compliant',
    lastUpdated: "Jun 8, 2023",
    score: 92,
    auditor: "ClimateAudit International"
  },
  {
    id: "r2",
    title: "Quarterly Project Monitoring Report",
    period: "Jan 2023 - Mar 2023",
    status: 'compliant',
    lastUpdated: "Apr 15, 2023",
    score: 98,
    auditor: "EcoVerify Partners"
  },
  {
    id: "r3",
    title: "Methodology Adherence Assessment",
    period: "Q2 2023",
    status: 'non_compliant',
    lastUpdated: "May 20, 2023",
    score: 68,
    auditor: "Carbon Standards Group",
    issues: [
      { severity: 'high', description: "Insufficient documentation for baseline calculations" },
      { severity: 'medium', description: "Monitoring plan needs revision for remote sensing methods" }
    ]
  },
  {
    id: "r4",
    title: "Project Additionality Verification",
    period: "Q2 2023",
    status: 'pending',
    lastUpdated: "Jun 1, 2023",
    score: 75,
    auditor: "Sustainable Future Audits"
  }
];
