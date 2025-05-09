"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationRequestsList } from "./components/VerificationRequestsList";
import { useVerification } from "@/contexts/VerificationContext";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { VerificationRequest } from "./types/verificationTypes";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

const fetchVerificationRequests = async ({
  page,
  status,
  setRequests,
  setTotalPages,
  setLoading,
}: {
  page: number;
  status: string;
  setRequests: React.Dispatch<React.SetStateAction<VerificationRequest[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    let query = supabase
      .from("projects")
      .select(
        `
        *,
        verification (
          verification_id,
          credits,
          unsignedTx,
          txHash,
          votes (
            vote_id,
            verifier_id,
            signed,
            vote,
            witness_set,
            rejection_reason,
            created_at,
            users (
              user_id,
              name,
              role,
              address
            )
          )
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    if (status !== "all") query = query.eq("status", status);

    const { count, data, error } = await query.range(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE - 1
    );

    if (error) throw error;

    setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    setRequests(
      (data || []).map((project) => ({
        ...project,
        verification: project.verification,
      }))
    );
  } catch (error: any) {
    console.error("Error fetching verification requests:", error.message);
    toast({
      title: "Error",
      description: "Failed to fetch verification requests.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

const Verification = () => {
  const { verificationRequests, setVerificationRequests } = useVerification();
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVerificationRequests({
      page,
      status: activeTab,
      setRequests: setVerificationRequests,
      setTotalPages,
      setLoading,
    });
  }, [activeTab, page, setVerificationRequests]);

  const filteredRequests = useMemo(
    () =>
      activeTab === "all"
        ? verificationRequests
        : verificationRequests.filter((req) => req.status === activeTab),
    [verificationRequests, activeTab]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Verification Center</h1>
            <p className="text-gray-600">
              Manage carbon offset project verifications
            </p>
          </div>
          <Link href="/projects/register">
            <Button>Submit New Verification</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6">
              {["all", "pending", "in_review", "approved", "rejected"].map(
                (tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() +
                      tab.slice(1).replace("_", " ")}
                  </TabsTrigger>
                )
              )}
            </TabsList>
            {["all", "pending", "in_review", "approved", "rejected"].map(
              (tab) => (
                <TabsContent key={tab} value={tab}>
                  <VerificationRequestsList requests={filteredRequests} />
                </TabsContent>
              )
            )}
          </Tabs>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Verification;
