
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CreditTransaction } from '@/types/user';

interface ProfileCreditsProps {
  transactions: CreditTransaction[];
}

export const ProfileCredits = ({ transactions }: ProfileCreditsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credit Portfolio</CardTitle>
          <CardDescription>Manage your carbon credits across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {transactions.map(transaction => (
              <div key={transaction.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.type}: {transaction.amount.toLocaleString()} credits</p>
                  <p className="text-sm text-gray-600">{transaction.project}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {transaction.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Transaction History
          </Button>
          <Button>
            Retire Credits
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
