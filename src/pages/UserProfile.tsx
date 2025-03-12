
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileHeader } from './profile/components/ProfileHeader';
import { ProfileOverview } from './profile/components/ProfileOverview';
import { ProfileProjects } from './profile/components/ProfileProjects';
import { ProfileCredits } from './profile/components/ProfileCredits';
import { ProfileAchievements } from './profile/components/ProfileAchievements';
import { userData, userProjects, creditTransactions, userBadges } from '@/data/sampleUserData';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ProfileHeader user={userData} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="credits">My Credits</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProfileOverview 
            user={userData}
            projects={userProjects}
            transactions={creditTransactions}
            badges={userBadges}
          />
        </TabsContent>

        <TabsContent value="projects">
          <ProfileProjects projects={userProjects} />
        </TabsContent>

        <TabsContent value="credits">
          <ProfileCredits transactions={creditTransactions} />
        </TabsContent>

        <TabsContent value="achievements">
          <ProfileAchievements badges={userBadges} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
