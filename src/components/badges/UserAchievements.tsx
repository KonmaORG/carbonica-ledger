
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDisplay, UserBadge } from './BadgeDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { SocialShareModal } from '../social/SocialShareModal';

interface UserAchievementsProps {
  badges: UserBadge[];
  userName: string;
  totalCreditsRetired: number;
}

export const UserAchievements = ({ badges, userName, totalCreditsRetired }: UserAchievementsProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  
  const shareableContent = {
    title: `${userName}'s Carbon Offset Achievements`,
    description: `${userName} has retired ${totalCreditsRetired.toLocaleString()} carbon credits and earned ${badges.length} sustainability badges!`,
    url: window.location.href,
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>
              Track your impact and share your progress
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1 items-center"
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Impact Summary</h3>
            <Badge variant="outline" className="bg-carbonica-green-light/20 text-carbonica-green-dark">
              Level {Math.floor(totalCreditsRetired / 1000) + 1}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Credits Retired</p>
              <p className="text-2xl font-bold">{totalCreditsRetired.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Badges Earned</p>
              <p className="text-2xl font-bold">{badges.length}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Your Badges</h3>
          {badges.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {badges.map((badge) => (
                <div key={badge.id} className="group relative" title={badge.description}>
                  <BadgeDisplay badge={badge} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">
              Start retiring carbon credits to earn your first badge!
            </p>
          )}
        </div>
      </CardContent>
      
      <SocialShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        content={shareableContent}
      />
    </Card>
  );
};
