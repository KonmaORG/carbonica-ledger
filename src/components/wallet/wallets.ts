import { EternlIcon, VesprIcon, YoroiIcon } from "./icons";

import { Wallet } from "@/types/cardano";

export const SUPPORTEDWALLETS: Wallet[] = [
  {
    name: "Eternl",
    icon: EternlIcon,
    enable: async () => {
      if (typeof window !== "undefined")
        window.open("https://eternl.io/", "_blank");

      throw "wallet not found";
    },
  },
  {
    name: "Vespr",
    icon: VesprIcon,
    enable: async () => {
      if (typeof window !== "undefined")
        window.open("https://vespr.xyz/", "_blank");
      throw "wallet not found";
    },
  },
  {
    name: "yoroi",
    icon: YoroiIcon,
    enable: async () => {
      if (typeof window !== "undefined")
        window.open("https://yoroi-wallet.com/", "_blank");
      throw "wallet not found";
    },
  },
];
