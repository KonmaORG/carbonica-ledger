// Wallet Provider to pass the wallet context
"use client";

import { useState } from "react";
import { Cardano, CardanoContext } from "./cardanoContext";

export default function CardanoProvider(props: { children: React.ReactNode }) {
  return (
    <CardanoContext.Provider value={useState<Cardano>({})}>
      {props.children}
    </CardanoContext.Provider>
  );
}
