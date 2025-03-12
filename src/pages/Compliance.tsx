import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, CheckCircle, Calendar, BarChart3, FileText, ShieldCheck } from 'lucide-react';

interface ComplianceReport {
  id: string;
  title: string;
  period: string;
  status: 'compliant' | 'non_compliant' | 'pending';
  lastUpdated: string;
  score: number;
  auditor?: string;
  issues?: { severity: 'high' | 'medium' | 'low'; description: string }[];
}

const MOCK_COMPLIANCE_REPORTS: ComplianceReport[] = [
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

const ComplianceScoreIndicator = ({ score }: { score: number }) => {
  let colorClass = "bg-red-500";
  if (score >= 90) {
    colorClass = "bg-green-500";
  } else if (score >= 70) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-gray-200"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${score >= 90 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - score}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{score}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Compliance Score</p>
        <p className="text-xs text-gray-500">
          {score >= 90 ? 'Excellent' : score >= 70 ? 'Needs Improvement' : 'Critical Issues'}
        </p>
      </div>
    </div>
  );
};

const ComplianceStatusBadge = ({ status }: { status: ComplianceReport['status'] }) => {
  switch (status) {
    case 'compliant':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Compliant
        </Badge>
      );
    case 'non_compliant':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Non-Compliant
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Calendar className="h-3 w-3 mr-1" />
          Review Pending
        </Badge>
      );
    default:
      return null;
  }
};

const ComplianceReportCard = ({ report }: { report: ComplianceReport }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{report.title}</CardTitle>
          <ComplianceStatusBadge status={report.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Reporting Period</p>
            <p className="font-medium">{report.period}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">{report.lastUpdated}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Auditor</p>
            <p className="font-medium">{report.auditor || 'Not assigned'}</p>
          </div>
          <div>
            <ComplianceScoreIndicator score={report.score} />
          </div>
        </div>
        
        {report.issues && report.issues.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <h4 className="font-medium text-red-800 mb-2">Compliance Issues</h4>
            {report.issues.map((issue, index) => (
              <div key={index} className="flex items-start mb-2 last:mb-0">
                <Badge variant="outline" className={`
                  mr-2 self-start mt-0.5
                  ${issue.severity === 'high' ? 'bg-red-100 text-red-800 border-red-200' : 
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                    'bg-blue-100 text-blue-800 border-blue-200'}
                `}>
                  {issue.severity}
                </Badge>
                <p className="text-sm text-gray-800">{issue.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Full Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Compliance = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Compliance & Reporting</h1>
          <p className="text-gray-600">Monitor your project's compliance with carbon offset standards and regulations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-carbonica-green-dark" />
                Overall Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-gray-200"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-carbonica-green-dark"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="20"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">80%</span>
                  </div>
                </div>
                <p className="text-center text-gray-600">Your projects are mostly compliant with required standards</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-carbonica-blue-dark" />
                Compliance by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 py-2">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Documentation</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Methodology</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Monitoring</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Verification</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-carbonica-green-dark" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 py-2">
                <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Quarterly Report</p>
                    <p className="text-xs text-gray-500">Q2 2023</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    In 7 days
                  </Badge>
                </div>
                <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Verification Renewal</p>
                    <p className="text-xs text-gray-500">Project #2</p>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                    In 3 days
                  </Badge>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Annual Audit</p>
                    <p className="text-xs text-gray-500">All Projects</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    In 45 days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="compliant">Compliant</TabsTrigger>
              <TabsTrigger value="issues">With Issues</TabsTrigger>
            </TabsList>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            {MOCK_COMPLIANCE_REPORTS.map(report => (
              <ComplianceReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
          
          <TabsContent value="compliant" className="space-y-4">
            {MOCK_COMPLIANCE_REPORTS.filter(r => r.status === 'compliant').map(report => (
              <ComplianceReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
          
          <TabsContent value="issues" className="space-y-4">
            {MOCK_COMPLIANCE_REPORTS.filter(r => r.status === 'non_compliant').map(report => (
              <ComplianceReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Compliance;
