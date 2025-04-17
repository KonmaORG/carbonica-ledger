
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { UserBadge, BadgeDisplay } from '@/components/badges/BadgeDisplay';

interface ProfileAchievementsProps {
  badges: UserBadge[];
}

export const ProfileAchievements = ({ badges }: ProfileAchievementsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Achievements</h2>
      <p className="text-gray-600">Showcase your impact and contributions to carbon reduction</p>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
        {badges.map(badge => (
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
    </div>
  );
};
