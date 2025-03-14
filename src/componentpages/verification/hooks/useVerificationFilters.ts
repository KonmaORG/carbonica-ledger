import { useState, useMemo } from "react";
import { VerificationRequest } from "../types/verificationTypes";
import { UTxO } from "@lucid-evolution/lucid";

type VerificationStatus =
  | "all"
  | "pending"
  | "in_review"
  | "approved"
  | "rejected";

export const useVerificationFilters = (
  requests: VerificationRequest[],
  utxos: UTxO[]
) => {
  const [activeTab, setActiveTab] = useState<VerificationStatus>("all");

  // Map UTxOs by txHash for quick lookup
  const utxoMap = useMemo(() => {
    return utxos.reduce((acc, utxo) => {
      acc[utxo.txHash] = utxo;
      return acc;
    }, {} as Record<string, UTxO>);
  }, [utxos]);

  const filteredRequests = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? requests
        : requests.filter((request) => request.status === activeTab);

    return filtered.map((request) => ({
      data: request,
      project: utxoMap[request.id] || null, // Match UTxO by txHash, else null
    }));
  }, [requests, activeTab, utxoMap]);

  return {
    activeTab,
    setActiveTab,
    filteredRequests,
  };
};
