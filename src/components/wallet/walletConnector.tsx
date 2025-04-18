"use client";
import { useEffect, useState } from "react";
import { LoaderCircle, LogOut, Wallet as WalletIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCardano } from "@/contexts/cardanoContext";
import { CardanoWallet } from "@/types/cardano";
import { SUPPORTEDWALLETS } from "./wallets";
import dynamic from "next/dynamic";
const WalletButton = dynamic(() => import("./walletButtons"), { ssr: false });

export default function WalletConnector() {
  const [walletConnection, setWalletConnection] = useCardano();
  const { address } = walletConnection;

  const [wallets, setWallets] = useState<CardanoWallet[]>(SUPPORTEDWALLETS);
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState<boolean>(false);

  useEffect(() => {
    // initialize lucid over here
    const installedWallets: CardanoWallet[] = [];
    const { cardano } = window;

    for (const c in cardano) {
      const wallet = (cardano as any)[c];

      if (!wallet.apiVersion) continue;
      installedWallets.push(wallet);
    }
    const updatedWallets = wallets;
    installedWallets.forEach((provider) => {
      const index = updatedWallets.findIndex(
        (wallet) => wallet.name.toLowerCase() === provider.name.toLowerCase()
      );
      if (index !== -1) {
        updatedWallets[index] = {
          ...updatedWallets[index],
          enable: provider.enable,
        };
      } else {
        updatedWallets.push({
          name: provider.name,
          enable: provider.enable,
          icon: provider.icon,
        });
      }
    });

    setWallets(updatedWallets.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  function disconnect() {
    setWalletConnection((prev) => {
      return {
        ...prev,
        wallet: undefined,
        address: "",
        balance: undefined,
      };
    });
  }

  return (
    <div className="">
      {address ? (
        <Button variant="outline" onClick={disconnect}>
          <LogOut />
          Disconnect
        </Button>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button disabled={connecting} variant="outline">
              {connecting ? (
                <>
                  <LoaderCircle className="animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  <WalletIcon />
                  Connect Wallet
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose your preferred wallet to connect with your account. If
                you don't have the wallet installed, you'll be redirected to
                download it.
              </DialogDescription>
            </DialogHeader>
            <WalletButton
              setConnecting={setConnecting}
              setIsOpen={setIsOpen}
              wallets={wallets}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
