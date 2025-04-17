
import React from 'react';
import { ComplianceReport } from '../types/complianceTypes';
import { ComplianceReportCard } from './ComplianceReportCard';

interface ComplianceReportsListProps {
  reports: ComplianceReport[];
}

export const ComplianceReportsList = ({ reports }: ComplianceReportsListProps) => {
  return (
    <>
      {reports.map(report => (
        <ComplianceReportCard key={report.id} report={report} />
      ))}
    </>
  );
};
