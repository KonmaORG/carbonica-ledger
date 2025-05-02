import React from "react";
import { ProjectCard, ProjectCardProps } from "../projects/ProjectCard";

const MOCK_PROJECTS: ProjectCardProps[] = [
  {
    project_id: "1",
    title: "Amazon Rainforest Conservation Initiative",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified",
    emissionsTarget: "125000",
  },
  {
    project_id: "2",
    title: "Serengeti Wildlife Corridor Protection",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified",
    emissionsTarget: "85000",
  },
  {
    project_id: "3",
    title: "Solar Farm Development in Rajasthan",
    type: "Renewable Energy",
    location: "India",
    startDate: "Feb 2023",
    status: "pending",
    emissionsTarget: "62000",
  },
];

export const FeaturedProjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <a
          href="/projects"
          className="text-carbonica-blue-dark hover:underline text-sm"
        >
          View All Projects
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.project_id} {...project} />
        ))}
      </div>
    </div>
  );
};
