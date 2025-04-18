"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCardano } from "@/contexts/cardanoContext";
import { CardanoWallet } from "@/types/cardano";
import Image from "next/image";
import { NETWORK, PROVIDER } from "@/config";
import { Lucid } from "@lucid-evolution/lucid";

interface WalletButtonProps {
  setConnecting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wallets: CardanoWallet[];
}
export default function WalletButton({
  setConnecting,
  setIsOpen,
  wallets,
}: WalletButtonProps) {
  const [walletConnection, setWalletConnection] = useCardano();

  async function onConnectWallet(wallet: CardanoWallet) {
    setConnecting(true);
    setIsOpen(false);
    try {
      const lucid = await Lucid(PROVIDER, NETWORK);

      const api = await wallet.enable();

      lucid.selectWallet.fromAPI(api);

      const address = await lucid.wallet().address();
      const balance = parseInt(await api.getBalance());

      setWalletConnection((prev) => {
        return { ...prev, wallet, address, balance, lucid };
      });
    } catch (error) {
      setConnecting(false);
      console.log(error);
    }
    setConnecting(false);
  }

  return (
    <div className="grid gap-4 py-4">
      {wallets.map((wallet) => (
        <Button
          key={wallet.name}
          variant="outline"
          className="flex items-center justify-start gap-3 h-14"
          disabled={!wallet.enable}
          onClick={() => onConnectWallet(wallet)}
        >
          <Image alt={wallet.name} height={20} src={wallet.icon} width={20} />
          <div className="text-left">
            <div className="font-semibold">{wallet.name}</div>
            <div className="text-xs text-muted-foreground">
              Connect to your {wallet.name} wallet
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
