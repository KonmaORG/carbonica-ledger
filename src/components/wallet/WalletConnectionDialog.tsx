
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WalletConnectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectionDialog = ({ isOpen, onClose }: WalletConnectionDialogProps) => {
  const handleWalletConnect = (walletType: string) => {
    console.log(`Connecting to ${walletType} wallet`);
    // Here you would implement the actual wallet connection logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect with your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-3 h-14"
            onClick={() => handleWalletConnect('metamask')}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">MetaMask</div>
              <div className="text-xs text-muted-foreground">Connect to your MetaMask wallet</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-3 h-14"
            onClick={() => handleWalletConnect('yoroi')}
          >
            <img src="https://docs.cardano.org/static/c832efd8d8012f6cefca9624435978b4/70e3c/yoroi.png" alt="Yoroi" className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">Yoroi</div>
              <div className="text-xs text-muted-foreground">Connect to your Yoroi wallet</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-3 h-14"
            onClick={() => handleWalletConnect('nami')}
          >
            <img src="https://namiwallet.io/apple-touch-icon.png" alt="Nami" className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">Nami</div>
              <div className="text-xs text-muted-foreground">Connect to your Nami wallet</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
