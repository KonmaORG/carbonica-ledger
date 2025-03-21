import { RegistryHeader } from "@/componentpages/registry/components/RegistryHeader";
import { RegistryTabs } from "@/componentpages/registry/RegistryTabs";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <RegistryHeader />
      <RegistryTabs />
    </div>
  );
}
