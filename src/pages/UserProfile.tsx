
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { UserBadge } from '@/components/badges/BadgeDisplay';
import { UserAchievements } from '@/components/badges/UserAchievements';
import { Button } from '@/components/ui/card';
import { ProjectCard } from '@/components/projects/ProjectCard';

// Mock user data
const mockUser = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex@example.com",
  role: "Carbon Credit Buyer",
  avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  joined: "Jan 2023",
  creditsOwned: 25000,
  creditsRetired: 15000,
};

// Mock user badges
const mockBadges: UserBadge[] = [
  {
    id: "badge-1",
    title: "First Offset",
    description: "Completed your first carbon offset",
    icon: "leaf",
    level: "bronze",
    earnedAt: "2023-02-15"
  },
  {
    id: "badge-2",
    title: "Offset Champion",
    description: "Retired over 10,000 carbon credits",
    icon: "trophy",
    level: "gold",
    earnedAt: "2023-05-22"
  },
  {
    id: "badge-3",
    title: "Rainforest Supporter",
    description: "Supported forest conservation projects",
    icon: "shield",
    level: "silver",
    earnedAt: "2023-03-10"
  },
  {
    id: "badge-4",
    title: "Consistent Supporter",
    description: "Made carbon offset purchases for 6 consecutive months",
    icon: "award",
    level: "platinum",
    earnedAt: "2023-08-05"
  },
  {
    id: "badge-5",
    title: "Renewable Pioneer",
    description: "Supported renewable energy projects",
    icon: "star",
    level: "silver",
    earnedAt: "2023-04-18"
  }
];

// Mock owned projects
const mockOwnedProjects = [
  {
    id: "4",
    title: "Wind Farm Development in Northern Europe",
    type: "Renewable Energy",
    location: "Denmark",
    startDate: "Apr 2023",
    status: "verified",
    credits: 35000,
    thumbnailUrl: "https://images.unsplash.com/photo-1545334894-9c7a7ccefaf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Mangrove Restoration Initiative",
    type: "Coastal Conservation",
    location: "Indonesia",
    startDate: "May 2023",
    status: "verified",
    credits: 18000,
    thumbnailUrl: "https://images.unsplash.com/photo-1602141407660-4b65c4e5e393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];

const UserProfile = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-carbonica-green-light">
              <img src={mockUser.avatarUrl} alt={mockUser.name} />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
              <p className="text-gray-600">{mockUser.role} · Joined {mockUser.joined}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-carbonica-green-light/20 px-3 py-1.5 rounded-md">
              <span className="text-xs text-carbonica-green-dark font-medium">
                Credits Owned: {mockUser.creditsOwned.toLocaleString()}
              </span>
            </div>
            <div className="bg-carbonica-blue-light/20 px-3 py-1.5 rounded-md">
              <span className="text-xs text-carbonica-blue-dark font-medium">
                Credits Retired: {mockUser.creditsRetired.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="credits">My Credits</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="mt-6">
            <UserAchievements 
              badges={mockBadges} 
              userName={mockUser.name} 
              totalCreditsRetired={mockUser.creditsRetired} 
            />
          </TabsContent>
          
          <TabsContent value="credits" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Carbon Credits</CardTitle>
                <CardDescription>Manage your purchased and retired carbon credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <p>Credit management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Supported Projects</CardTitle>
                <CardDescription>Projects you've purchased credits from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockOwnedProjects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
