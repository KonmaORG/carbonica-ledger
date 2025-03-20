import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { ComplianceReportsList } from "@/componentpages/compliance/components/ComplianceReportsList";
import { MOCK_COMPLIANCE_REPORTS } from "@/componentpages/compliance/data/mockComplianceData";
import { ComplianceDashboard } from "@/componentpages/compliance/components/ComplianceDashboard";

export default function Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Compliance & Reporting</h1>
        <p className="text-gray-600">
          Monitor your project's compliance with carbon offset standards and
          regulations
        </p>
      </div>

      <ComplianceDashboard />

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
          <ComplianceReportsList reports={MOCK_COMPLIANCE_REPORTS} />
        </TabsContent>

        <TabsContent value="compliant" className="space-y-4">
          <ComplianceReportsList
            reports={MOCK_COMPLIANCE_REPORTS.filter(
              (r) => r.status === "compliant"
            )}
          />
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <ComplianceReportsList
            reports={MOCK_COMPLIANCE_REPORTS.filter(
              (r) => r.status === "non_compliant"
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
