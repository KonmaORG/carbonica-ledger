"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { ProjectType } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ProfileProjectsProps {
  projects?: ProjectType[];
}

export const ProfileProjects = ({
  projects: initialProjects,
}: ProfileProjectsProps) => {
  const [projects, setProjects] = useState<ProjectType[]>(
    initialProjects || []
  );
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Get the authenticated user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error("User not authenticated");
        }

        // Fetch projects for the user
        const { data, error } = await supabase
          .from("projects")
          .select(
            "project_id, title, type, location, startDate, status, emissionsTarget, description, estimatedCompletion, documents"
          )
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        // Map data to ProjectType
        const transformedProjects: ProjectType[] = data.map((project) => ({
          project_id: project.project_id,
          title: project.title,
          type: project.type,
          location: project.location,
          startDate: project.startDate,
          status: project.status as "verified" | "pending" | "rejected",
          emissionsTarget: project.emissionsTarget,
          description: project.description || undefined,
          estimatedCompletion: project.estimatedCompletion || undefined,
          documents: project.documents || undefined,
          developer: undefined, // Not in projects table
          verifier: undefined, // Not in projects table
        }));

        setProjects(transformedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError((err as Error).message);
        setLoading(false);
      }
    }

    if (!initialProjects) {
      fetchProjects();
    }
  }, [initialProjects]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Projects</h2>
        <Button>
          <Leaf className="h-4 w-4 mr-2" />
          Register New Project
        </Button>
      </div>
      {loading ? (
        <div>Loading projects...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.project_id}
              project_id={project.project_id}
              title={project.title}
              type={project.type}
              location={project.location}
              startDate={project.startDate}
              status={project.status}
              emissionsTarget={project.emissionsTarget}
            />
          ))}
        </div>
      )}
    </div>
  );
};
