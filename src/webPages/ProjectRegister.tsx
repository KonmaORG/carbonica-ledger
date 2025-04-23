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
import { ProjectDocumentUpload } from "@/types/project";
import { calculateCombinedHash } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const ProjectRegister = () => {
  const [submissionState, setSubmissionState] = useState<"form" | "success">(
    "form"
  );
  const [projectData, setProjectData] = useState<any>(null);
  const [documents, setDocuments] = useState<ProjectDocumentUpload[]>([]);
  const { user } = useAuth();

  const uploadDocuments = async (
    projectId: string,
    documents: ProjectDocumentUpload[],
    user: any // Replace 'any' with your user type, e.g., Supabase User
  ): Promise<{ file_name: string; file_path: string; file_type: string }[]> => {
    const uploadedFiles: {
      file_name: string;
      file_path: string;
      file_type: string;
    }[] = [];

    if (documents.length === 0) {
      return uploadedFiles; // Return empty array if no documents
    }

    // Find the thumbnail (first item with isThumbnail: true)
    const thumbnail = documents.find((doc) => doc.isThumbnail);
    const otherDocs = documents.filter((doc) => !doc.isThumbnail);

    try {
      // Upload thumbnail to project-thumbnails bucket (if exists)
      if (thumbnail) {
        const file = thumbnail.file;
        const fileExt = file.name.split(".").pop();
        const fileName = `${
          user.id
        }/${projectId}/thumbnail_${Date.now()}.${fileExt}`;

        // Upload to project-thumbnails bucket
        const { data, error } = await supabase.storage
          .from("project-thumbnails")
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (error) {
          console.error("Error uploading thumbnail:", error.message);
          toast({
            title: "Upload Error",
            description: `Failed to upload thumbnail: ${error.message}`,
            variant: "destructive",
          });
          throw error;
        }

        // Get the public URL for the thumbnail
        const { data: urlData } = supabase.storage
          .from("project-thumbnails")
          .getPublicUrl(fileName);

        if (!urlData.publicUrl) {
          throw new Error("Failed to retrieve public URL for thumbnail");
        }

        uploadedFiles.push({
          file_name: file.name,
          file_path: urlData.publicUrl,
          file_type: file.type,
        });

        // Revoke local URL
        URL.revokeObjectURL(thumbnail.url);
      }

      // Upload other documents to project-documents bucket
      for (const doc of otherDocs) {
        const file = doc.file;
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${projectId}/${Date.now()}.${fileExt}`;

        // Upload to project-documents bucket
        const { data, error } = await supabase.storage
          .from("project-documents")
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (error) {
          console.error("Error uploading file:", error.message);
          toast({
            title: "Upload Error",
            description: `Failed to upload ${file.name}: ${error.message}`,
            variant: "destructive",
          });
          throw error;
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from("project-documents")
          .getPublicUrl(fileName);

        if (!urlData.publicUrl) {
          throw new Error(`Failed to retrieve public URL for ${file.name}`);
        }

        uploadedFiles.push({
          file_name: file.name,
          file_path: urlData.publicUrl,
          file_type: file.type,
        });

        // Revoke local URL
        URL.revokeObjectURL(doc.url);
      }

      return uploadedFiles;
    } catch (error: any) {
      if (error.statusCode === "404" && error.error === "Bucket not found") {
        toast({
          title: "Storage Error",
          description: `Storage bucket not found: ${
            thumbnail && error.message.includes("project-thumbnails")
              ? "'project-thumbnails'"
              : "'project-documents'"
          }. Please contact support.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Upload Error",
          description:
            "An error occurred while uploading files. Please try again.",
          variant: "destructive",
        });
      }
      throw error; // Re-throw for caller to handle
    }
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
      const uploadedFiles = await uploadDocuments(
        projectData.id,
        documents,
        user
      );
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
