
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const WalletSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Management</CardTitle>
        <CardDescription>
          Connect and manage your blockchain wallets for carbon credit transactions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ethereum Wallet</p>
                <p className="text-sm font-mono">0x7F5E...8A4D</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Disconnect</Button>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-secondary/20">
            <p className="font-medium">Connect Additional Wallets</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <Button variant="outline" className="justify-start">
                <img src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=024" className="h-5 w-5 mr-2" alt="Polygon" />
                Connect Polygon
              </Button>
              <Button variant="outline" className="justify-start">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=024" className="h-5 w-5 mr-2" alt="Solana" />
                Connect Solana
              </Button>
              <Button variant="outline" className="justify-start">
                <img src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=024" className="h-5 w-5 mr-2" alt="Avalanche" />
                Connect Avalanche
              </Button>
              <Button variant="outline" className="justify-start">
                <img src="https://cryptologos.cc/logos/near-protocol-near-logo.png?v=024" className="h-5 w-5 mr-2" alt="NEAR" />
                Connect NEAR
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="font-medium">Transaction History</p>
            <p className="text-sm text-muted-foreground mt-1">View all your wallet transactions and carbon credit transfers.</p>
            <Button variant="outline" className="mt-2">View Transaction History</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
