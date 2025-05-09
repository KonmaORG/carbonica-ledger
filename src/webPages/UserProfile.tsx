"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "./profile/components/ProfileHeader";
import ProfileOverview from "./profile/components/ProfileOverview";
import { ProfileProjects } from "./profile/components/ProfileProjects";
import { ProfileCredits } from "./profile/components/ProfileCredits";
import { ProfileAchievements } from "./profile/components/ProfileAchievements";
import { createClient } from "@supabase/supabase-js";
import { ProjectType } from "@/types/project";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string;
  avatarUrl: string;
  joinDate: string;
  totalCredits: number;
  activeCredits: number;
  retiredCredits: number;
  verifiedProjects: number;
}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get authenticated user from auth.users
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !authUser) {
          throw new Error("User not authenticated");
        }

        // Fetch user details from users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_id, name, role, avatar_url")
          .eq("user_id", authUser.id)
          .single();

        if (userError) {
          throw new Error(userError.message);
        }

        // Fetch projects for the user
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select(
            "project_id, title, type, location, startDate, status, emissionsTarget, description, estimatedCompletion, documents"
          )
          .eq("user_id", authUser.id);

        if (projectError) {
          throw new Error(projectError.message);
        }

        // Fetch credits using get_carbon_credits
        const { data: creditData, error: creditError } = await supabase
          .rpc("get_carbon_credits")
          .eq("owner", authUser.id);

        if (creditError) {
          throw new Error(creditError.message);
        }

        // Map projects to ProjectType
        const transformedProjects: ProjectType[] = projectData.map(
          (project) => ({
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
            developer: undefined,
            verifier: undefined,
          })
        );

        // Calculate credits
        const creditSummary = creditData.reduce(
          (
            acc: { total: number; active: number; retired: number },
            credit: any
          ) => ({
            total:
              acc.total +
              credit.active_amount +
              credit.retired_amount +
              credit.transfer_amount,
            active: acc.active + credit.active_amount,
            retired: acc.retired + credit.retired_amount,
          }),
          { total: 0, active: 0, retired: 0 }
        );

        // Count verified projects
        const verifiedProjects = projectData.filter(
          (p) => p.status === "verified"
        ).length;

        // Format joinDate from auth.users.created_at
        const joinDate = authUser.created_at
          ? new Date(authUser.created_at).toISOString().split("T")[0]
          : "Unknown";

        setUser({
          id: userData.user_id,
          name: userData.name || "Unknown",
          email: authUser.email || "Unknown",
          role: userData.role || "Unknown",
          avatarUrl: userData.avatar_url || "",
          joinDate,
          company: "Unknown", // No company field in users table
          totalCredits: creditSummary.total,
          activeCredits: creditSummary.active,
          retiredCredits: creditSummary.retired,
          verifiedProjects,
        });
        setProjects(transformedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // Placeholder data for credits and badges
  const creditTransactions: any[] = [];
  const userBadges: any[] = [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {loading ? (
        <div>Loading profile...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : !user ? (
        <div>Please log in to view your profile.</div>
      ) : (
        <>
          <ProfileHeader user={user} />

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="credits">My Credits</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ProfileOverview
                user={user}
                projects={projects}
                transactions={creditTransactions}
                badges={userBadges}
              />
            </TabsContent>

            <TabsContent value="projects">
              <ProfileProjects projects={projects} />
            </TabsContent>

            <TabsContent value="credits">
              <ProfileCredits transactions={creditTransactions} />
            </TabsContent>

            <TabsContent value="achievements">
              <ProfileAchievements badges={userBadges} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default UserProfile;
