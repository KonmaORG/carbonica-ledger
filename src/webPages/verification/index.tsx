"use client";
import React, { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationRequestsList } from "./components/VerificationRequestsList";
import { useVerification } from "@/contexts/VerificationContext";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { VerificationRequest } from "./types/verificationTypes";

const ITEMS_PER_PAGE = 10;

const fetchVerificationRequests = async ({
  page,
  activeTab,
  setVerificationRequests,
  setTotalPages,
  setIsLoading,
}: {
  page: number;
  activeTab: string;
  setVerificationRequests: React.Dispatch<
    React.SetStateAction<VerificationRequest[]>
  >;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setIsLoading(true);
  try {
    // Build the base query with a left join to include verification data
    let query = supabase
      .from("projects")
      .select(
        `
        *,
        verification (
          id,
          credits,
          rejectionReason,
          unsignedTx,
          txHash,
          verifiers
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    // Apply status filter if activeTab is not "all"
    if (activeTab !== "all") {
      query = query.eq("status", activeTab);
    }

    // Fetch total count for pagination
    const { count, error: countError } = await query;

    if (countError) throw countError;

    const totalItems = count || 0;
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

    // Fetch requests for the current page
    const { data, error } = await query.range(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE - 1
    );

    if (error) throw error;

    // Map the data to ensure verification is included (even if null)
    const formattedData = (data || []).map((project) => ({
      ...project,
      verification: project.verification, // Ensure verification is included
    }));
    setVerificationRequests(formattedData as VerificationRequest[]);
  } catch (error: any) {
    console.error("Error fetching verification requests:", error.message);
    toast({
      title: "Error",
      description: "Failed to fetch verification requests. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

const Verification = () => {
  const { verificationRequests, setVerificationRequests } = useVerification();
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  // Fetch requests when activeTab or currentPage changes
  useEffect(() => {
    fetchVerificationRequests({
      page: currentPage,
      activeTab,
      setVerificationRequests,
      setTotalPages,
      setIsLoading,
    });
  }, [activeTab, currentPage, setVerificationRequests]);

  // Filter requests based on the active tab (client-side fallback)
  const filteredRequests = React.useMemo(() => {
    if (activeTab === "all") return verificationRequests;
    return verificationRequests.filter(
      (request) => request.status === activeTab
    );
  }, [verificationRequests, activeTab]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1); // Reset to first page on tab change
            }}
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
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
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
