
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, CheckCircle, Calendar, FileText } from 'lucide-react';
import { ComplianceReport } from '../types/complianceTypes';
import { ComplianceScoreIndicator } from './ComplianceScoreIndicator';

interface ComplianceReportCardProps {
  report: ComplianceReport;
}

export const ComplianceStatusBadge = ({ status }: { status: ComplianceReport['status'] }) => {
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

export const ComplianceReportCard = ({ report }: ComplianceReportCardProps) => {
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
