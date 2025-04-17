
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const BlockchainVerification = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Blockchain Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          All carbon credit transactions are recorded on the Cardano blockchain for maximum transparency and security.
          You can verify any credit by entering its ID in the Cardano blockchain explorer.
        </p>
        <Button variant="outline" className="text-carbonica-blue-dark border-carbonica-blue-dark hover:bg-carbonica-blue-light/10">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Blockchain Explorer
        </Button>
      </CardContent>
    </Card>
  );
};
