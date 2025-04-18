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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const ProjectRegister = () => {
  const [submissionState, setSubmissionState] = useState<"form" | "success">(
    "form"
  );
  const [projectData, setProjectData] = useState<any>(null);
  const { user } = useAuth();

  const handleFormSubmit = async (data: any) => {
    if (!user) {
      console.log("must be logged in");
      return;
    }
    console.log("Project registration data:", data);
    setProjectData(data);
    setSubmissionState("success");
    // call cardano project submit and then save data on supabase with txHash
    const formattedData = {
      user_id: user.id, // Assuming session contains user ID
      project_name: data.projectName,
      project_type: data.projectType,
      location: data.location,
      country: data.country,
      start_date: data.startDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      estimated_completion: data.estimatedCompletion
        .toISOString()
        .split("T")[0],
      emissions_target: data.emissionsTarget,
      description: data.description,
      txHash: "uyfkjgcj",
    };
    const { error } = await supabase.from("Projects").insert([formattedData]);

    if (error) {
      console.log(error.message);
      return;
    }

    console.log("Project submitted successfully!");
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
};

export default ProjectRegister;
