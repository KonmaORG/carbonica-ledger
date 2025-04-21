"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import {
  Address,
  Blockfrost,
  LucidEvolution,
  PaymentKeyHash,
  StakeKeyHash,
} from "@lucid-evolution/lucid";
import { CardanoWallet } from "@/types/cardano";

export type Cardano = {
  lucid?: LucidEvolution;
  wallet?: CardanoWallet;
  address?: Address;
  balance?: number;
  pkh?: PaymentKeyHash;
  skh?: StakeKeyHash;
  provider?: Blockfrost;
};

export const CardanoContext = createContext<
  [Cardano, Dispatch<SetStateAction<Cardano>>]
>([{}, () => {}]);
export const useCardano = () => useContext(CardanoContext);
