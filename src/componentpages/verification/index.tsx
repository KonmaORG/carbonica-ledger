
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VerificationRequestsList } from './components/VerificationRequestsList';
import { MOCK_VERIFICATION_REQUESTS } from './data/mockVerificationData';
import { useVerificationFilters } from './hooks/useVerificationFilters';

const VerificationPage = () => {
  const { activeTab, setActiveTab, filteredRequests } = useVerificationFilters(MOCK_VERIFICATION_REQUESTS);

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

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_review">In Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <VerificationRequestsList requests={filteredRequests} />
          </TabsContent>
          
          <TabsContent value="pending">
            <VerificationRequestsList requests={filteredRequests} />
          </TabsContent>
          
          <TabsContent value="in_review">
            <VerificationRequestsList requests={filteredRequests} />
          </TabsContent>
          
          <TabsContent value="approved">
            <VerificationRequestsList requests={filteredRequests} />
          </TabsContent>
          
          <TabsContent value="rejected">
            <VerificationRequestsList requests={filteredRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VerificationPage;
