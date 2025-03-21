"use client";
import React, { useState } from "react";
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

const MOCK_PROJECTS: ProjectCardProps[] = [
  {
    id: "1",
    title: "Amazon Rainforest Conservation Initiative",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified",
    credits: 125000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Serengeti Wildlife Corridor Protection",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified",
    credits: 85000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Solar Farm Development in Rajasthan",
    type: "Renewable Energy",
    location: "India",
    startDate: "Feb 2023",
    status: "pending",
    credits: 62000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Wind Power Expansion in Scotland",
    type: "Renewable Energy",
    location: "United Kingdom",
    startDate: "Apr 2023",
    status: "verified",
    credits: 45000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Mangrove Restoration in Sundarbans",
    type: "Wetland Restoration",
    location: "Bangladesh",
    startDate: "Dec 2022",
    status: "verified",
    credits: 73000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Agricultural Methane Capture Program",
    type: "Methane Reduction",
    location: "Argentina",
    startDate: "May 2023",
    status: "pending",
    credits: 28000,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectType, setProjectType] = useState<string>("all-types");
  const [status, setStatus] = useState<string>("all-statuses");

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      projectType === "all-types" || project.type === projectType;
    const matchesStatus =
      status === "all-statuses" || project.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-carbonica-green-light/30 to-carbonica-blue-light/30 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-carbonica-green-dark mb-2">
              Carbon Offset Projects
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Explore verified carbon offset projects from around the world.
              Support initiatives that reduce carbon emissions and contribute to
              a sustainable future.
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
              <p className="text-sm font-medium text-gray-700">Global Impact</p>
              <p className="text-xl font-semibold">
                {MOCK_PROJECTS.length} Projects
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
                {MOCK_PROJECTS.reduce(
                  (acc, project) => acc + project.credits,
                  0
                ).toLocaleString()}{" "}
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
                {Math.round(
                  (MOCK_PROJECTS.filter((p) => p.status === "verified").length /
                    MOCK_PROJECTS.length) *
                    100
                )}
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
              <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
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

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
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
  );
}
