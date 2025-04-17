
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ProfileProjectsProps {
  projects: Project[];
}

export const ProfileProjects = ({ projects }: ProfileProjectsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Projects</h2>
        <Button>
          <Leaf className="h-4 w-4 mr-2" />
          Register New Project
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id}
            id={project.id}
            title={project.title}
            type={project.type}
            location={project.location}
            startDate={project.startDate}
            status={project.status}
            credits={project.credits}
            thumbnailUrl={project.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
};
