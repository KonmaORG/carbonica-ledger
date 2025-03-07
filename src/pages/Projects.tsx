
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';

// Mock data for projects
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
  },
  {
    id: "4",
    title: "Wind Power Expansion in Scotland",
    type: "Renewable Energy",
    location: "United Kingdom",
    startDate: "Apr 2023",
    status: "verified",
    credits: 45000,
    thumbnailUrl: "https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Mangrove Restoration in Sundarbans",
    type: "Wetland Restoration",
    location: "Bangladesh",
    startDate: "Dec 2022",
    status: "verified",
    credits: 73000,
    thumbnailUrl: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    title: "Agricultural Methane Capture Program",
    type: "Methane Reduction",
    location: "Argentina",
    startDate: "May 2023",
    status: "pending",
    credits: 28000,
    thumbnailUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectType, setProjectType] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Filter projects based on search term, project type, and status
  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = projectType === '' || project.type === projectType;
    const matchesStatus = status === '' || project.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Carbon Offset Projects</h1>
          <Link to="/projects/register">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Register Project
            </Button>
          </Link>
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
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Forest Conservation">Forest Conservation</SelectItem>
                <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                <SelectItem value="Biodiversity Conservation">Biodiversity Conservation</SelectItem>
                <SelectItem value="Wetland Restoration">Wetland Restoration</SelectItem>
                <SelectItem value="Methane Reduction">Methane Reduction</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
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
            <p className="text-lg text-gray-500">No projects found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm('');
              setProjectType('');
              setStatus('');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
