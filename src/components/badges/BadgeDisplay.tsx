
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Leaf, Shield, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'award' | 'leaf' | 'shield' | 'heart' | 'star';
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt: string;
}

const badgeIcons = {
  trophy: Trophy,
  award: Award,
  leaf: Leaf,
  shield: Shield,
  heart: Heart,
  star: Star,
};

const badgeColors = {
  bronze: 'bg-amber-100 text-amber-800 border-amber-200',
  silver: 'bg-slate-100 text-slate-800 border-slate-200',
  gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  platinum: 'bg-blue-100 text-blue-800 border-blue-200',
};

interface BadgeDisplayProps {
  badge: UserBadge;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTitle?: boolean;
}

export const BadgeDisplay = ({ 
  badge, 
  size = 'md', 
  className,
  showTitle = true 
}: BadgeDisplayProps) => {
  const IconComponent = badgeIcons[badge.icon];
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base',
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className={cn(
          "rounded-full flex items-center justify-center mb-1",
          sizeClasses[size],
          badge.level ? badgeColors[badge.level] : "bg-carbonica-green-light/30 text-carbonica-green-dark"
        )}
      >
        <IconComponent className={cn(
          size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'
        )} />
      </div>
      {showTitle && (
        <span className="text-xs font-medium text-center">{badge.title}</span>
      )}
    </div>
  );
};
