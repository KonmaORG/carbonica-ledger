import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, FileText } from "lucide-react";
import Link from "next/link";

export const DashboardHero = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-carbonica-green-dark to-carbonica-blue-dark text-white">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')]"></div>
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent Carbon Offset Registry on Cardano
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl">
            A decentralized and immutable ledger for carbon credit issuance,
            transfers, and retirements, ensuring transparency and preventing
            double-counting in the carbon market.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/projects/register">
              <Button
                size="lg"
                className="bg-white text-carbonica-green-dark hover:bg-gray-100"
              >
                <FileText className="mr-2 h-5 w-5" />
                Register a Project
              </Button>
            </Link>
            <Link href="/registry">
              <Button
                size="lg"
                className="bg-white text-carbonica-green-dark hover:bg-gray-100 shadow-md hover:shadow-lg transition-all"
              >
                <Globe className="mr-2 h-5 w-5" />
                Explore Public Registry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
