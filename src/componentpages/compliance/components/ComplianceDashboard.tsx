
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, BarChart3, Calendar } from 'lucide-react';

export const ComplianceDashboard = () => {
  return (
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
  );
};
