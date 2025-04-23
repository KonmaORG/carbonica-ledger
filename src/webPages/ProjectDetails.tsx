"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialShareButton } from "@/components/social/SocialShareButton";
import {
  Leaf,
  MapPin,
  Calendar,
  BadgeCheck,
  ArrowLeft,
  User,
  FileCheck,
  Building,
} from "lucide-react";
import { CreditLedger } from "./registry/components/CreditLedger";
import { MOCK_CREDIT_ENTRIES } from "./registry/data/mockCreditEntries";
import { ProjectType } from "@/types/project";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatDateToLongForm } from "@/lib/utils";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType>();
  const [shareContent, setShareContent] = useState({
    title: ``,
    description: ``,
    url: ``,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && project) {
      setShareContent({
        title: `Carbon Offset Project: ${project.title}`,
        description: `Check out this ${project.type} carbon offset project in ${project.location} with ${project.emissionsTarget} verified carbon credits!`,
        url: window.location.href,
      });
    }
  }, [project]);

  const fetchProject = async (projectId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*") // Select the columns you need
        .eq("id", projectId) // Filter by the specific ID
        .single(); // Expect a single record

      if (error) throw error;
      setProject(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusBadge = () => {
    switch (project.status) {
      case "verified":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-verified"
          >
            <BadgeCheck className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-pending"
          >
            Pending Verification
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="verification-badge verification-badge-rejected"
          >
            Verification Failed
          </Badge>
        );
      default:
        return null;
    }
  };
  const handleDownload = async (filePath, fileName) => {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up the object URL
    window.URL.revokeObjectURL(url);
  };
  const thumbnailURL = project.documents?.[0]?.file_path;
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/projects">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <SocialShareButton content={shareContent} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    thumbnailURL ||
                    "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">{getStatusBadge()}</div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <Leaf className="h-4 w-4 mr-2 text-carbonica-green-dark" />
                      <span>{project.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-carbonica-green-dark" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-carbonica-green-dark" />
                      <span>Started: {project.startDate}</span>
                    </div>
                    <div className="bg-carbonica-green-light/20 px-3 py-1 rounded-full">
                      <span className="text-carbonica-green-dark font-medium">
                        {project.emissionsTarget} Credits
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="credits">Credits</TabsTrigger>
                    <TabsTrigger value="documentation">
                      Documentation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Project Description
                      </h3>
                      <p className="text-gray-700">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start gap-2">
                        <Building className="h-5 w-5 text-carbonica-green-dark mt-0.5" />
                        <div>
                          <p className="font-medium">Project Developer</p>
                          <p className="text-gray-600">{project.developer}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileCheck className="h-5 w-5 text-carbonica-green-dark mt-0.5" />
                        <div>
                          <p className="font-medium">Verification Body</p>
                          <p className="text-gray-600">{project.verifier}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 text-carbonica-green-dark mt-0.5" />
                        <div>
                          <p className="font-medium">Methodology</p>
                          <p className="text-gray-600">
                            {project.description?.substring(0, 100)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-carbonica-green-dark mt-0.5" />
                        <div>
                          <p className="font-medium">Verification Date</p>
                          <p className="text-gray-600">
                            {formatDateToLongForm(project.estimatedCompletion)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="credits">
                    {/* <CreditLedger creditEntries={project.emissionsTarget} /> */}
                  </TabsContent>

                  <TabsContent value="documentation">
                    <div className="space-y-4">
                      {project.documents?.map((doc) => (
                        <div
                          key={doc.file_path}
                          className="p-4 border rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{doc.file_name}</h4>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownload(doc.file_path, doc.file_name)
                              }
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Map View</span>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{project.location}</p>
                  <p className="mt-2">
                    This project is located in a critical ecosystem region with
                    high biodiversity value.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Project Manager</p>
                      <p className="text-gray-600">Alex Johnson</p>
                      <p className="text-carbonica-blue-dark">
                        alex@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Developer Organization</p>
                      <p className="text-gray-600">{project.developer}</p>
                      <p className="text-carbonica-blue-dark">
                        info@ecofund.org
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
