"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCardano } from "@/contexts/cardanoContext";
import { CardanoWallet } from "@/types/cardano";
import Image from "next/image";
import { BF_PID, BF_URL, NETWORK } from "@/config";
import { Blockfrost, Lucid, Network } from "@lucid-evolution/lucid";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

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
  const { user } = useAuth();
  async function onConnectWallet(wallet: CardanoWallet) {
    setConnecting(true);
    setIsOpen(false);
    try {
      if (!user) throw new Error("User not logged in");
      const PROVIDER = new Blockfrost(BF_URL, BF_PID);
      const lucid = await Lucid(PROVIDER, NETWORK as Network);

      let balance;
      const api = await wallet.enable();
      lucid.selectWallet.fromAPI(api);
      const address = await lucid.wallet().address();
      // check address is same are registered address else throw error
      //  balance = parseInt(await api.getBalance());
      const { data: userData, error } = await supabase
        .from("users")
        .select()
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      if (!userData.address) {
        const { error } = await supabase
          .from("users")
          .update({ address })
          .eq("user_id", user.id)
          .select();
        if (error) throw error;
      } else if (userData.address !== address) {
        throw new Error(
          "Please connect with your registered wallet address:\n" +
            userData.address.slice(0, 5) +
            "..." +
            userData.address.slice(-10)
        );
      }
      setWalletConnection((prev) => {
        return { ...prev, wallet, address, balance, lucid };
      });
    } catch (error: any) {
      setConnecting(false);
      console.log(error);
      toast({
        title: "Failed to connect wallet",
        description: `${error.message}`,
        variant: "destructive",
      });
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
