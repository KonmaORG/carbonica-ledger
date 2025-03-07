
import React from 'react';
import { ProjectCard, ProjectCardProps } from '../projects/ProjectCard';

const MOCK_PROJECTS: ProjectCardProps[] = [
  {
    id: "1",
    title: "Amazon Rainforest Conservation Initiative",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified",
    credits: 125000,
    thumbnailUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Serengeti Wildlife Corridor Protection",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified",
    credits: 85000,
    thumbnailUrl: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Solar Farm Development in Rajasthan",
    type: "Renewable Energy",
    location: "India",
    startDate: "Feb 2023",
    status: "pending",
    credits: 62000,
    thumbnailUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];

export const FeaturedProjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <a href="/projects" className="text-carbonica-blue-dark hover:underline text-sm">
          View All Projects
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};
