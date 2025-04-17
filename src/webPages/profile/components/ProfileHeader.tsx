
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SocialShareButton } from '@/components/social/SocialShareButton';
import { BadgeCheck } from 'lucide-react';
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const profileShareContent = {
    title: `${user.name}'s Carbon Offset Profile`,
    description: `View ${user.name}'s carbon offset projects and achievements with a total of ${user.totalCredits.toLocaleString()} carbon credits.`,
    url: window.location.href
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Badge variant="outline" className="bg-carbonica-green-light text-carbonica-green-dark">
              <BadgeCheck className="h-3.5 w-3.5 mr-1" />
              Verified Developer
            </Badge>
          </div>
          <p className="text-gray-600">{user.company}</p>
          <p className="text-gray-600 text-sm">Member since {user.joinDate}</p>
        </div>
      </div>
      <SocialShareButton content={profileShareContent} />
    </div>
  );
};
