"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  ProjectCard,
  ProjectCardProps,
} from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, Leaf, Globe, BarChart3 } from "lucide-react";
import Link from "next/link";
import { ProjectType } from "@/types/project";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 10;

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectType, setProjectType] = useState<string>("all-types");
  const [status, setStatus] = useState<string>("all-statuses");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch projects from Supabase
  const fetchProjects = async (page: number) => {
    setIsLoading(true);
    try {
      // Fetch total count for pagination
      const { count, error: countError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      if (countError) throw countError;

      const totalItems = count || 0;
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

      // Fetch projects for the current page
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (error) throw error;

      setProjects(data || []);
    } catch (error: any) {
      console.error("Error fetching projects:", error.message);
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects when page changes
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  // Handle page navigation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const filteredProjects = MOCK_PROJECTS.filter((project) => {
  //   const matchesSearch =
  //     project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     project.location.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesType =
  //     projectType === "all-types" || project.type === projectType;
  //   const matchesStatus =
  //     status === "all-statuses" || project.status === status;
  //   return matchesSearch && matchesType && matchesStatus;
  // });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-carbonica-green-light/30 to-carbonica-blue-light/30 p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-carbonica-green-dark mb-2">
                Carbon Offset Projects
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Explore verified carbon offset projects from around the world.
                Support initiatives that reduce carbon emissions and contribute
                to a sustainable future.
              </p>
            </div>
            <Link href="/projects/register" className="mt-4 md:mt-0">
              <Button className="bg-carbonica-green-dark hover:bg-carbonica-green-dark/90">
                <Plus className="h-4 w-4 mr-2" />
                Register Project
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center p-3 bg-white/80 rounded-lg shadow-sm">
              <Globe className="h-5 w-5 text-carbonica-green-dark mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Global Impact
                </p>
                <p className="text-xl font-semibold">
                  {/* {MOCK_PROJECTS.length} Projects */}
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white/80 rounded-lg shadow-sm">
              <Leaf className="h-5 w-5 text-carbonica-green-dark mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Carbon Credits
                </p>
                <p className="text-xl font-semibold">
                  {/* {MOCK_PROJECTS.reduce(
                    (acc, project) => acc + project.credits,
                    0
                  ).toLocaleString()}{" "} */}
                  tons
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white/80 rounded-lg shadow-sm">
              <BarChart3 className="h-5 w-5 text-carbonica-green-dark mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Verification Rate
                </p>
                <p className="text-xl font-semibold">
                  {/* {Math.round(
                    (MOCK_PROJECTS.filter((p) => p.status === "verified")
                      .length /
                      MOCK_PROJECTS.length) *
                      100
                  )} */}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search projects by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="Forest Conservation">
                  Forest Conservation
                </SelectItem>
                <SelectItem value="Renewable Energy">
                  Renewable Energy
                </SelectItem>
                <SelectItem value="Biodiversity Conservation">
                  Biodiversity Conservation
                </SelectItem>
                <SelectItem value="Wetland Restoration">
                  Wetland Restoration
                </SelectItem>
                <SelectItem value="Methane Reduction">
                  Methane Reduction
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.project_id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">
              No projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setProjectType("all-types");
                setStatus("all-statuses");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              (currentPage - 1) * ITEMS_PER_PAGE + projects.length
            )}{" "}
            of {totalPages * ITEMS_PER_PAGE} projects
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
