
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Leaf, BadgeCheck, Clock } from 'lucide-react';
import { User, CreditTransaction } from '@/types/user';
import { Project } from '@/types/project';
import { UserBadge } from '@/components/badges/BadgeDisplay';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { UserAchievements } from '@/components/badges/UserAchievements';

interface ProfileOverviewProps {
  user: User;
  projects: Project[];
  transactions: CreditTransaction[];
  badges: UserBadge[];
}

export const ProfileOverview = ({ 
  user, 
  projects, 
  transactions, 
  badges 
}: ProfileOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Award className="h-4 w-4 mr-2 text-carbonica-blue-medium" />
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.totalCredits.toLocaleString()}</p>
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
            <p className="text-2xl font-bold">{user.activeCredits.toLocaleString()}</p>
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
            <p className="text-2xl font-bold">{user.retiredCredits.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-8">Recent Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
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
            {transactions.slice(0, 3).map(transaction => (
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
        badges={badges} 
        userName={user.name} 
        totalCreditsRetired={user.retiredCredits} 
      />
    </div>
  );
};
