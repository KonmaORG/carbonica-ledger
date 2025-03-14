"use client";

import WalletConnector from "@/components/wallet/client";
import dynamic from "next/dynamic";
const AdminPage = dynamic(() => import("./admin"), { ssr: false });

export default function AdminClient() {
  return (
    <>
      Loading Admin Page...
      <WalletConnector />
      <AdminPage />
    </>
  );
}
