
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Award, Leaf, Clock, Share2, Download } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { UserAchievements } from '@/components/badges/UserAchievements';
import { BadgeDisplay } from '@/components/badges/BadgeDisplay';
import { SocialShareButton } from '@/components/social/SocialShareButton';
import { UserBadge } from '@/components/badges/BadgeDisplay';

// Sample user data
const userData = {
  id: "user1",
  name: "Jane Smith",
  company: "EcoTech Solutions",
  email: "jane.smith@ecotech.com",
  role: "Project Developer",
  avatarUrl: "https://i.pravatar.cc/150?img=5",
  joinDate: "January 2023",
  totalCredits: 43000,
  activeCredits: 28000,
  retiredCredits: 15000,
  verifiedProjects: 4
};

// Sample projects
const userProjects = [
  {
    id: "1",
    title: "Amazon Rainforest Conservation",
    type: "Forest Conservation",
    location: "Brazil",
    startDate: "Jan 2023",
    status: "verified" as "verified" | "pending" | "rejected", // Fixed type with explicit casting
    credits: 25000,
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Serengeti Wildlife Corridor",
    type: "Biodiversity Conservation",
    location: "Tanzania",
    startDate: "Mar 2023",
    status: "verified" as "verified" | "pending" | "rejected", // Fixed type with explicit casting
    credits: 18000,
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Wind Power Expansion",
    type: "Renewable Energy",
    location: "United Kingdom",
    startDate: "Apr 2023",
    status: "pending" as "verified" | "pending" | "rejected", // Fixed type with explicit casting
    credits: 12000,
    thumbnailUrl: "/placeholder.svg",
  }
];

// Sample credit transactions
const creditTransactions = [
  {
    id: "tx1",
    date: "May 15, 2023",
    type: "Issuance",
    project: "Amazon Rainforest Conservation",
    amount: 25000,
    status: "Completed"
  },
  {
    id: "tx2",
    date: "June 2, 2023",
    type: "Transfer",
    project: "Amazon Rainforest Conservation",
    amount: 5000,
    recipient: "TechGiant Co.",
    status: "Completed"
  },
  {
    id: "tx3",
    date: "July 10, 2023",
    type: "Retirement",
    project: "Amazon Rainforest Conservation",
    amount: 5000,
    status: "Completed"
  },
  {
    id: "tx4",
    date: "August 5, 2023",
    type: "Issuance",
    project: "Serengeti Wildlife Corridor",
    amount: 18000,
    status: "Completed"
  }
];

// Sample user badges
const userBadges: UserBadge[] = [
  {
    id: "badge1",
    title: "Early Adopter",
    description: "One of the first to join our platform",
    icon: "star",
    level: "bronze",
    earnedAt: "2023-01-15"
  },
  {
    id: "badge2",
    title: "Carbon Neutralizer",
    description: "Retired 10,000+ carbon credits",
    icon: "leaf",
    level: "silver",
    earnedAt: "2023-05-20"
  },
  {
    id: "badge3",
    title: "Project Validator",
    description: "Successfully validated 5+ projects",
    icon: "shield",
    level: "gold",
    earnedAt: "2023-07-10"
  }
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Create profile share content
  const profileShareContent = {
    title: `${userData.name}'s Carbon Offset Profile`,
    description: `View ${userData.name}'s carbon offset projects and achievements with a total of ${userData.totalCredits.toLocaleString()} carbon credits.`,
    url: window.location.href
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <Badge variant="outline" className="bg-carbonica-green-light text-carbonica-green-dark">
                  <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                  Verified Developer
                </Badge>
              </div>
              <p className="text-gray-600">{userData.company}</p>
              <p className="text-gray-600 text-sm">Member since {userData.joinDate}</p>
            </div>
          </div>
          <SocialShareButton content={profileShareContent} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="credits">My Credits</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Award className="h-4 w-4 mr-2 text-carbonica-blue-medium" />
                    Total Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{userData.totalCredits.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Leaf className="h-4 w-4 mr-2 text-carbonica-green-medium" />
                    Active Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{userData.activeCredits.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BadgeCheck className="h-4 w-4 mr-2 text-carbonica-purple-medium" />
                    Retired Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{userData.retiredCredits.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-bold mt-8">Recent Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userProjects.slice(0, 3).map((project) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Recent Credit Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {creditTransactions.slice(0, 3).map(transaction => (
                    <div key={transaction.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{transaction.type}: {transaction.amount.toLocaleString()} credits</p>
                        <p className="text-sm text-gray-600">{transaction.project}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Clock className="h-4 w-4 mr-2" />
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>

            <UserAchievements 
              badges={userBadges} 
              userName={userData.name} 
              totalCreditsRetired={userData.retiredCredits} 
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Projects</h2>
              <Button>
                <Leaf className="h-4 w-4 mr-2" />
                Register New Project
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userProjects.map((project) => (
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
          </TabsContent>

          <TabsContent value="credits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Credit Portfolio</CardTitle>
                <CardDescription>Manage your carbon credits across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {creditTransactions.map(transaction => (
                    <div key={transaction.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{transaction.type}: {transaction.amount.toLocaleString()} credits</p>
                        <p className="text-sm text-gray-600">{transaction.project}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Transaction History
                </Button>
                <Button>
                  Retire Credits
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-bold">Your Achievements</h2>
            <p className="text-gray-600">Showcase your impact and contributions to carbon reduction</p>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
              {userBadges.map(badge => (
                <BadgeDisplay 
                  key={badge.id}
                  badge={badge} 
                  size="md"
                  showTitle={true}
                />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Achievements
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
