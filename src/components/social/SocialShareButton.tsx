
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { SocialShareModal } from './SocialShareModal';

interface SocialShareButtonProps {
  content: {
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
  };
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const SocialShareButton = ({ 
  content, 
  variant = "outline", 
  size = "sm",
  className
}: SocialShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use the current URL if none is provided
  const shareContent = {
    ...content,
    url: content.url || window.location.href
  };

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      
      <SocialShareModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={shareContent}
      />
    </>
  );
};
