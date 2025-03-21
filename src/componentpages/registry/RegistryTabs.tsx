"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Webhook } from "lucide-react";
import { CreditLedger } from "./components/CreditLedger";
import { BlockchainVerification } from "./components/BlockchainVerification";
import { ApiDocumentation } from "@/components/api/ApiDocumentation";
import { MOCK_CREDIT_ENTRIES } from "./data/mockCreditEntries";

export const RegistryTabs = () => {
  const [activeTab, setActiveTab] = useState("registry");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="registry" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          Public Registry
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-1">
          <Code className="h-4 w-4" />
          API Access
        </TabsTrigger>
        <TabsTrigger value="webhooks" className="flex items-center gap-1">
          <Webhook className="h-4 w-4" />
          Webhooks
        </TabsTrigger>
      </TabsList>

      <TabsContent value="registry">
        <CreditLedger creditEntries={MOCK_CREDIT_ENTRIES} />
        <BlockchainVerification />
      </TabsContent>

      <TabsContent value="api">
        <ApiDocumentation />
      </TabsContent>

      <TabsContent value="webhooks">
        <ApiDocumentation />
      </TabsContent>
    </Tabs>
  );
};
