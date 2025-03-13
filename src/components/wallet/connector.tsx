"use client";
import { useEffect, useState } from "react";
import { LoaderCircle, LogOut, Wallet as WalletIcon } from "lucide-react";
import Image from "next/image";

import { SUPPORTEDWALLETS } from "./wallets";

import { Wallet } from "@/types/cardano";
import { useWallet } from "@/context/walletContext";
import { mkLucid } from "@/lib/lucid";
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
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function WalletComponent() {
  const [walletConnection, setWalletConnection] = useWallet();
  const { lucid, address } = walletConnection;

  const [wallets, setWallets] = useState<Wallet[]>(SUPPORTEDWALLETS);
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState<boolean>(false);

  useEffect(() => {
    mkLucid(setWalletConnection);

    const installedWallets: Wallet[] = [];
    const { cardano } = window;

    for (const c in cardano) {
      const wallet = cardano[c];

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

  async function onConnectWallet(wallet: Wallet) {
    setConnecting(true);
    setIsOpen(false);
    try {
      if (!lucid) throw "Uninitialized Lucid!!!";

      const api = await wallet.enable();

      lucid.selectWallet.fromAPI(api);

      const address = await lucid.wallet().address();
      const balance = parseInt(await api.getBalance());

      setWalletConnection((prev) => {
        return { ...prev, wallet, address, balance };
      });
    } catch (error) {
      setConnecting(false);
      console.log(error);
    }
    setConnecting(false);
  }

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
            <Button disabled={connecting}>
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
            <div className="grid gap-4 py-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="flex items-center justify-start gap-3 h-14"
                  disabled={!wallet.enable}
                  onClick={() => onConnectWallet(wallet)}
                >
                  <Image
                    alt={wallet.name}
                    height={20}
                    src={wallet.icon}
                    width={20}
                  />
                  <div className="text-left">
                    <div className="font-semibold">{wallet.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Connect to your {wallet.name} wallet
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
