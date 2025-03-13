import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShareButton } from '@/components/social/SocialShareButton';
import { Leaf, MapPin, Calendar, BadgeCheck, ArrowLeft, User, FileCheck, Building } from 'lucide-react';
import { CreditLedger } from './registry/components/CreditLedger';
import { MOCK_CREDIT_ENTRIES } from './registry/data/mockCreditEntries';
import { Project } from '@/types/project';

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Amazon Rainforest Conservation Initiative",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified",
    credits: 125000,
    thumbnailUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive conservation project aimed at protecting and restoring critical areas of the Amazon rainforest. This initiative focuses on preventing deforestation, promoting sustainable land use, and supporting local communities.",
    verificationDate: "Mar 2023",
    methodology: "VM0015 - Avoided Unplanned Deforestation",
    developer: "EcoFund Inc.",
    verifier: "Climate Standards Authority (CSA)"
  },
  {
    id: "2",
    title: "Serengeti Wildlife Corridor Protection",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified",
    credits: 85000,
    thumbnailUrl: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Protection of critical wildlife corridors in the Serengeti ecosystem, ensuring the safe migration of numerous species and preserving biodiversity in the region.",
    verificationDate: "May 2023",
    methodology: "VM0009 - Avoided Ecosystem Conversion",
    developer: "Wildlife Protection Trust",
    verifier: "EcoVerify International"
  },
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = MOCK_PROJECTS.find(p => p.id === id);
  
  const projectCredits = MOCK_CREDIT_ENTRIES.filter(credit => credit.projectId === id);

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
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
          <Badge variant="outline" className="verification-badge verification-badge-verified">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="verification-badge verification-badge-pending">
            Pending Verification
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="verification-badge verification-badge-rejected">
            Verification Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const shareContent = {
    title: `Carbon Offset Project: ${project.title}`,
    description: `Check out this ${project.type} carbon offset project in ${project.location} with ${project.credits.toLocaleString()} verified carbon credits!`,
    url: window.location.href
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/projects">
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
                  src={project.thumbnailUrl || 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge()}
                </div>
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
                      <span className="text-carbonica-green-dark font-medium">{project.credits.toLocaleString()} Credits</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="credits">Credits</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Project Description</h3>
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
                          <p className="text-gray-600">{project.methodology}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-carbonica-green-dark mt-0.5" />
                        <div>
                          <p className="font-medium">Verification Date</p>
                          <p className="text-gray-600">{project.verificationDate}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="credits">
                    <CreditLedger creditEntries={projectCredits} />
                  </TabsContent>
                  
                  <TabsContent value="documentation">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                        <a href="#" className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Project Design Document (PDD)</h4>
                            <p className="text-sm text-gray-600">Last updated: April 2023</p>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </a>
                      </div>
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                        <a href="#" className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Validation Report</h4>
                            <p className="text-sm text-gray-600">Last updated: May 2023</p>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </a>
                      </div>
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                        <a href="#" className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Verification Statement</h4>
                            <p className="text-sm text-gray-600">Last updated: June 2023</p>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </a>
                      </div>
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                        <a href="#" className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Monitoring Report</h4>
                            <p className="text-sm text-gray-600">Last updated: July 2023</p>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </a>
                      </div>
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
                  <p className="mt-2">This project is located in a critical ecosystem region with high biodiversity value.</p>
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
                      <p className="text-carbonica-blue-dark">alex@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Developer Organization</p>
                      <p className="text-gray-600">{project.developer}</p>
                      <p className="text-carbonica-blue-dark">info@ecofund.org</p>
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
