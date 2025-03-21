"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/context/walletContext";
import { mintingPolicyToId, UTxO } from "@lucid-evolution/lucid";
import { getAddress } from "@/lib/utils";
import { ValidatorContract, ValidatorMinter } from "@/config/scripts/scripts";
import { VerificationRequestsList } from "@/componentpages/verification/components/VerificationRequestsList";
import { useVerificationFilters } from "@/componentpages/verification/hooks/useVerificationFilters";
import { MOCK_VERIFICATION_REQUESTS } from "@/componentpages/verification/data/mockVerificationData";

export default function Page() {
  const [projects, setProjects] = useState<UTxO[]>([]);
  const { activeTab, setActiveTab, filteredRequests } = useVerificationFilters(
    MOCK_VERIFICATION_REQUESTS,
    projects
  );
  const [walletConnection] = useWallet();
  const { lucid } = walletConnection;
  const VALIDATOR_CONTRACT_ADDRESS = getAddress(ValidatorContract);
  const PID_MINTER = mintingPolicyToId(ValidatorMinter());

  useEffect(() => {
    if (!lucid) return;
    const fetchUtxos = async () => {
      const utxos = await lucid.utxosAt(VALIDATOR_CONTRACT_ADDRESS);
      const filteredUtxos = utxos.filter((utxo) => {
        const assets = utxo.assets;
        return Object.keys(assets).some((key) => key.startsWith(PID_MINTER));
      });
      setProjects(filteredUtxos);
    };
    fetchUtxos();
  }, [lucid]);

  return (
    // <Layout>
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Verification Center</h1>
          <p className="text-gray-600">
            Track and manage verification requests for your carbon offset
            projects
          </p>
        </div>
        <Button>Submit New Verification</Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <VerificationRequestsList requests={filteredRequests} />
        </TabsContent>

        <TabsContent value="pending">
          <VerificationRequestsList requests={filteredRequests} />
        </TabsContent>

        <TabsContent value="in_review">
          <VerificationRequestsList requests={filteredRequests} />
        </TabsContent>

        <TabsContent value="approved">
          <VerificationRequestsList requests={filteredRequests} />
        </TabsContent>

        <TabsContent value="rejected">
          <VerificationRequestsList requests={filteredRequests} />
        </TabsContent>
      </Tabs>
    </div>
    // </Layout>
  );
}
