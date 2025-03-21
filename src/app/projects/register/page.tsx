"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectRegistrationForm } from "@/components/projects/ProjectRegistrationForm";
import { ProjectRegistrationSuccess } from "@/components/projects/ProjectRegistrationSuccess";
import { submitProject } from "@/lib/transaction";
import { useWallet } from "@/context/walletContext";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  const [WalletConnection] = useWallet();
  const [submissionState, setSubmissionState] = useState<"form" | "success">(
    "form"
  );
  const [projectData, setProjectData] = useState<any>(null);

  const handleFormSubmit = async (data: any) => {
    console.log("Project registration data:", data);
    setProjectData(data);
    const result = await submitProject(
      WalletConnection,
      data.documentHash,
      data.projectType,
      data.projectName
    );
    if (result.status !== "ok") {
      toast({
        title: "Error submitting project",
        description:
          result.error || "An error occurred while submitting your project.",
      });
    } else {
      toast({
        title: "Project submitted for registration",
        description: result.txHash,
      });
      setSubmissionState("success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Register Carbon Offset Project</h1>
        <p className="text-gray-600">
          Submit your project details to get carbon credits for verified
          emissions reductions
        </p>
      </div>

      {submissionState === "form" ? (
        <Card>
          <CardHeader>
            <CardTitle>Project Registration Form</CardTitle>
            <CardDescription>
              Please provide accurate information about your carbon offset
              project. All submissions will be reviewed by validators before
              credit issuance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="emissions">Emissions Data</TabsTrigger>
                <TabsTrigger value="documents">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <ProjectRegistrationForm onSubmit={handleFormSubmit} />
              </TabsContent>
              <TabsContent value="emissions">
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Please complete the Project Details tab first.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Please complete the Project Details tab first.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <ProjectRegistrationSuccess projectData={projectData} />
      )}
    </div>
  );
}
