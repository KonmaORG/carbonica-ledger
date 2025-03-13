
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WALLET_URLS = {
  yoroi: 'https://yoroi-wallet.com',
  nami: 'https://namiwallet.io'
};

export const WalletConnectionDialog = ({ isOpen, onClose }: WalletConnectionDialogProps) => {
  const { toast } = useToast();
  
  useEffect(() => {
    console.log('WalletConnectionDialog rendered, isOpen:', isOpen);
    // Debug available wallets
    console.log('Available wallets:', {
      ethereum: window.ethereum ? 'Available' : 'Not available',
      yoroi: window.cardano?.yoroi ? 'Available' : 'Not available',
      nami: window.cardano?.nami ? 'Available' : 'Not available'
    });
  }, [isOpen]);

  const handleWalletConnect = async (walletType: string) => {
    console.log(`Attempting to connect to ${walletType} wallet`);
    try {
      switch (walletType) {
        case 'metamask':
          if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            toast({
              title: "Success",
              description: "MetaMask wallet connected successfully",
            });
          } else {
            window.open('https://metamask.io/download/', '_blank');
            throw new Error('MetaMask is not installed');
          }
          break;
          
        case 'yoroi':
          if (window.cardano?.yoroi) {
            await window.cardano.yoroi.enable();
            toast({
              title: "Success",
              description: "Yoroi wallet connected successfully",
            });
          } else {
            window.open(WALLET_URLS.yoroi, '_blank');
            throw new Error('Yoroi wallet is not installed');
          }
          break;
          
        case 'nami':
          if (window.cardano?.nami) {
            await window.cardano.nami.enable();
            toast({
              title: "Success",
              description: "Nami wallet connected successfully",
            });
          } else {
            window.open(WALLET_URLS.nami, '_blank');
            throw new Error('Nami wallet is not installed');
          }
          break;
      }
      onClose();
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect with your account. If you don't have the wallet installed, you'll be redirected to download it.
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
            <img src="/lovable-uploads/d36c360f-b4db-4611-a97d-ce6e851e3725.png" alt="Yoroi" className="h-8 w-8" />
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
            <img src="/lovable-uploads/9a8cc5bd-cc59-40a7-aa4c-69cc1e1f1099.png" alt="Nami" className="h-8 w-8" />
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
