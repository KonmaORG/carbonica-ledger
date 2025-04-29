"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, FileCheck, Paperclip, Upload, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calculateCombinedHash } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { ProjectDocumentUpload } from "@/types/project";
import { supabase } from "@/lib/supabase";
import { submitProject } from "@/lib/cardanoTx/registry";
import { useAuth } from "@/contexts/AuthContext";
import { useCardano } from "@/contexts/cardanoContext";

const projectFormSchema = z.object({
  title: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  type: z.string({
    required_error: "Please select a project type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  estimatedCompletion: z.date({
    required_error: "An estimated completion date is required.",
  }),
  emissionsTarget: z.string().min(1, {
    message: "Emissions reduction target is required.",
  }),
  description: z
    .string()
    .min(50, {
      message: "Description must be at least 50 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectRegistrationFormProps {
  projectData: any;
  setProjectData: (data: any) => void;
  setSubmissionState: (state: "form" | "success") => void;
}

const PROJECT_TYPES = [
  "Forest Conservation",
  "Renewable Energy",
  "Methane Capture",
  "Energy Efficiency",
  "Reforestation",
  "Wetland Restoration",
  "Sustainable Agriculture",
  "Biodiversity Conservation",
  "Clean Transportation",
  "Other",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export default function ProjectRegistrationForm({
  projectData,
  setProjectData,
  setSubmissionState,
}: ProjectRegistrationFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      description: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ProjectDocumentUpload[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [walletconnection] = useCardano();
  const { lucid, wallet } = walletconnection;
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
        const fileName = `${user.id}/${projectId}/thumbnail.${fileExt}`;

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
  const handleFormSubmit = async (data: ProjectFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a project.",
        variant: "destructive",
      });
      return;
    }
    if (!wallet || !lucid) {
      toast({
        title: "Wallet not connected",
        description: "You must connect your wallet to submit a project.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      // Calculate documents hash for Cardano integration
      const documentsHash = await calculateCombinedHash(documents);

      // Format project data
      const formattedData = {
        ...data,
        user_id: user.id,
        startDate: data.startDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
        estimatedCompletion: data.estimatedCompletion
          .toISOString()
          .split("T")[0],
        txHash: null,
        documents: [], // Initialize as empty; will be updated after uploads
      };
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
      // Upload documents and get metadata
      const uploadedFiles = await uploadDocuments(
        projectData.project_id,
        documents,
        user
      );
      // Cardano Tx Function
      const txHash = await submitProject(
        walletconnection,
        documentsHash,
        projectData.type,
        projectData.title,
        `${user.id}/${projectData.project_id}/thumbnail.${documents[0].file.name
          .split(".")
          .pop()}`
      );
      // Update the project with the documents array if there are uploaded files
      if (uploadedFiles.length > 0) {
        const { error: updateError } = await supabase
          .from("projects")
          .update({ documents: uploadedFiles, txHash })
          .eq("project_id", projectData.project_id);

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
        project_id: projectData.project_id,
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Thumbnail image must be under 50MB.",
          variant: "destructive",
        });
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Thumbnail must be an image (JPEG, PNG, GIF, WebP).",
          variant: "destructive",
        });
        return;
      }

      // Revoke existing thumbnail URL if it exists
      const existingThumbnail = documents.find((doc) => doc.isThumbnail);
      if (existingThumbnail) {
        URL.revokeObjectURL(existingThumbnail.url);
      }

      const newThumbnail: ProjectDocumentUpload = {
        file,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        isThumbnail: true,
      };

      // Remove existing thumbnail from documents and add new thumbnail as first item
      const filteredDocs = documents.filter((doc) => !doc.isThumbnail);
      setDocuments([newThumbnail, ...filteredDocs]);
      setThumbnailPreview(newThumbnail.url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    } else {
      console.log("No files selected");
    }
  };

  const handleFiles = (files: FileList) => {
    try {
      const newDocs: ProjectDocumentUpload[] = Array.from(files)
        .filter((file) => file.size <= MAX_FILE_SIZE)
        .map((file) => ({
          file,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
        }));

      if (newDocs.length < files.length) {
        toast({
          title: "Invalid files",
          description:
            "Only PDFs and images (JPEG, PNG, GIF, WebP) up to 50MB are allowed.",
          variant: "destructive",
        });
      }

      if (newDocs.length > 0) {
        // Ensure thumbnail remains first by filtering it out and appending new docs
        const thumbnail = documents.find((doc) => doc.isThumbnail);
        const otherDocs = documents.filter((doc) => !doc.isThumbnail);
        setDocuments(
          thumbnail
            ? [thumbnail, ...otherDocs, ...newDocs]
            : [...otherDocs, ...newDocs]
        );
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Error",
        description: "Failed to process uploaded files.",
        variant: "destructive",
      });
    }
  };

  const removeDocument = (docUrl: string) => {
    const doc = documents.find((d) => d.url === docUrl);
    if (doc) {
      URL.revokeObjectURL(doc.url);
      if (doc.isThumbnail) {
        setThumbnailPreview(null);
      }
    }
    const newDocs = documents.filter((d) => d.url !== docUrl);
    setDocuments(newDocs);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Rainforest Conservation Initiative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Amazon Basin, Manaus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Brazil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedCompletion"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Estimated Completion Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emissionsTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emissions Reduction Target (tCO₂e)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 25000" {...field} />
                </FormControl>
                <FormDescription>
                  Estimated CO₂ equivalent to be reduced/sequestered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project, its environmental impact, and how it reduces carbon emissions..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your project, including
                methodology and expected outcomes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>Project Thumbnail</Label>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 border-2 border-dashed rounded-lg p-6 text-center">
              <Paperclip className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">
                Upload a thumbnail image for your project
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPEG, PNG, GIF, or WebP (max 50MB)
              </p>
              <Input
                type="file"
                className="hidden"
                id="thumbnail-upload"
                onChange={handleThumbnailChange}
                accept="image/jpeg,image/png,image/gif,image/webp"
                ref={thumbnailInputRef}
              />
              <Label htmlFor="thumbnail-upload" className="mt-4 inline-block">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Thumbnail
                </Button>
              </Label>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              {thumbnailPreview ? (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Project Thumbnail Preview"
                    className="max-w-full max-h-48 rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-red-500"
                    onClick={() => removeDocument(thumbnailPreview)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No thumbnail uploaded
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Project Documents</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Paperclip className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Upload PDFs or images (JPEG, PNG, GIF, WebP)
            </p>
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              accept="application/pdf,image/jpeg,image/png,image/gif,image/webp"
              ref={fileInputRef}
            />
            <Label htmlFor="file-upload" className="mt-4 inline-block">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Browse Files
              </Button>
            </Label>
          </div>
        </div>

        {/* Document Preview Section */}
        {documents.length > 0 && (
          <div className="space-y-2">
            <Label>Attached Documents ({documents.length})</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
              {documents.map((doc) => (
                <div
                  key={doc.url}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm truncate max-w-[200px] sm:max-w-[300px]">
                      {doc.name} {doc.isThumbnail ? "(Thumbnail)" : ""}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-500 hover:text-red-500"
                    onClick={() => removeDocument(doc.url)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Project for Validation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
