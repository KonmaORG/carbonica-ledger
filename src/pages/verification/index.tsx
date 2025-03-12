
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VerificationRequestsList } from './components/VerificationRequestsList';
import { MOCK_VERIFICATION_REQUESTS } from './data/mockVerificationData';

const VerificationPage = () => {
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
          
          <TabsContent value="all">
            <VerificationRequestsList requests={MOCK_VERIFICATION_REQUESTS} />
          </TabsContent>
          
          <TabsContent value="pending">
            <VerificationRequestsList 
              requests={MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'pending')} 
            />
          </TabsContent>
          
          <TabsContent value="in_review">
            <VerificationRequestsList 
              requests={MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'in_review')} 
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <VerificationRequestsList 
              requests={MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'approved')} 
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <VerificationRequestsList 
              requests={MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'rejected')} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VerificationPage;
