import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertCircle, Clock, ArrowRight } from 'lucide-react';

interface VerificationRequest {
  id: string;
  projectId: string;
  projectName: string;
  submittedDate: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  progress: number;
  verifier?: string;
  expectedCompletion?: string;
  rejectionReason?: string;
}

const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "v1",
    projectId: "3",
    projectName: "Solar Farm Development in Rajasthan",
    submittedDate: "May 15, 2023",
    status: "in_review",
    progress: 60,
    verifier: "ClimateVerify Ltd.",
    expectedCompletion: "Jun 25, 2023"
  },
  {
    id: "v2",
    projectId: "6",
    projectName: "Agricultural Methane Capture Program",
    submittedDate: "May 20, 2023",
    status: "pending",
    progress: 10
  },
  {
    id: "v3",
    projectId: "7",
    projectName: "Afforestation Project in Kenya",
    submittedDate: "Apr 12, 2023",
    status: "approved",
    progress: 100,
    verifier: "GreenCert International"
  },
  {
    id: "v4",
    projectId: "8",
    projectName: "Waste-to-Energy Facility",
    submittedDate: "Apr 5, 2023",
    status: "rejected",
    progress: 100,
    verifier: "EcoAudit Partners",
    rejectionReason: "Insufficient documentation for emissions baseline calculation"
  }
];

const VerificationStatusBadge = ({ status }: { status: VerificationRequest['status'] }) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case 'in_review':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          In Review
        </Badge>
      );
    case 'approved':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

const VerificationRequestCard = ({ request }: { request: VerificationRequest }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{request.projectName}</h3>
            <p className="text-sm text-gray-500">Submitted: {request.submittedDate}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <VerificationStatusBadge status={request.status} />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Verification Progress</span>
            <span className="font-medium">{request.progress}%</span>
          </div>
          <Progress value={request.progress} className="h-2" />
        </div>
        
        {request.verifier && (
          <div className="mt-4 text-sm">
            <span className="text-gray-600">Verifier: </span>
            <span className="font-medium">{request.verifier}</span>
          </div>
        )}
        
        {request.expectedCompletion && (
          <div className="mt-1 text-sm">
            <span className="text-gray-600">Expected Completion: </span>
            <span className="font-medium">{request.expectedCompletion}</span>
          </div>
        )}
        
        {request.rejectionReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-800">
            <p className="font-medium mb-1">Rejection Reason:</p>
            <p>{request.rejectionReason}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Verification = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Verification Center</h1>
            <p className="text-gray-600">Track and manage verification requests for your carbon offset projects</p>
          </div>
          <Button>Submit New Verification</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_review">In Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {MOCK_VERIFICATION_REQUESTS.map(request => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'pending').map(request => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="in_review" className="space-y-4">
            {MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'in_review').map(request => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            {MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'approved').map(request => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            {MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'rejected').map(request => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Verification;
