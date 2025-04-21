"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectRegistrationForm } from "@/components/projects/ProjectRegistrationForm";
import { ProjectRegistrationSuccess } from "@/components/projects/ProjectRegistrationSuccess";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { ProjectDocument } from "@/types/project";
import { calculateCombinedHash } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const ProjectRegister = () => {
  const [submissionState, setSubmissionState] = useState<"form" | "success">(
    "form"
  );
  const [projectData, setProjectData] = useState<any>(null);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const { user } = useAuth();

  const uploadDocuments = async (
    projectId: string
  ): Promise<{ file_name: string; file_path: string; file_type: string }[]> => {
    const uploadedFiles: {
      file_name: string;
      file_path: string;
      file_type: string;
    }[] = [];
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a project.",
        variant: "destructive",
      });
      return uploadedFiles;
    }

    if (documents.length === 0) {
      return uploadedFiles; // Return empty array if no documents
    }
    console.log("uploadingFiles");
    for (const doc of documents) {
      const file = doc.file; // File object from ProjectDocument
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${projectId}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("project-documents")
        .upload(fileName, file, {
          contentType: file.type,
        });

      if (error) {
        console.error("Error uploading file:", error.message);
        throw error;
      }
      console.log("uploadedFiles");

      // Get the public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from("project-documents")
        .getPublicUrl(fileName);
      console.log("url");

      uploadedFiles.push({
        file_name: file.name,
        file_path: urlData.publicUrl || fileName,
        file_type: file.type, // MIME type, e.g., application/pdf, image/jpeg
      });
    }

    return uploadedFiles;
  };

  const handleFormSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a project.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Calculate documents hash for Cardano integration
      const documentsHash = await calculateCombinedHash(documents);
      console.log("Documents hash:", documentsHash);

      // Format project data
      const formattedData = {
        ...data,
        user_id: user.id,
        startDate: data.startDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
        estimatedCompletion: data.estimatedCompletion
          .toISOString()
          .split("T")[0],
        txHash: Date.now().toString(), // Replace with actual Cardano transaction hash
        documents: [], // Initialize as empty; will be updated after uploads
      };
      console.log("about to insert");
      // Insert project into `projects` table and retrieve the project ID
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([formattedData])
        .select()
        .single();

      if (projectError) {
        console.error("Error inserting project:", projectError.message);
        throw projectError;
      }
      console.log("inserted project data");

      // Upload documents and get metadata
      const uploadedFiles = await uploadDocuments(projectData.id);
      console.log("files uploaded");

      // Update the project with the documents array if there are uploaded files
      if (uploadedFiles.length > 0) {
        console.log("updating project with documents");

        const { error: updateError } = await supabase
          .from("projects")
          .update({ documents: uploadedFiles })
          .eq("id", projectData.id);

        if (updateError) {
          console.error(
            "Error updating project with documents:",
            updateError.message
          );
          throw updateError;
        }
      }

      // Set success state
      setProjectData({
        ...formattedData,
        id: projectData.id,
        documents: uploadedFiles,
      });
      setSubmissionState("success");
      toast({
        title: "Project Submitted",
        description:
          "Your project and documents have been successfully submitted!",
      });
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission Failed",
        description:
          "An error occurred while submitting your project. Please try again.",
        variant: "destructive",
      });
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
                <ProjectRegistrationForm
                  onSubmit={handleFormSubmit}
                  documents={documents}
                  setDocuments={setDocuments}
                />
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
