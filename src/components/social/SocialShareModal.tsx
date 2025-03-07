
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
  };
}

export const SocialShareModal = ({ isOpen, onClose, content }: SocialShareProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const encodedTitle = encodeURIComponent(content.title);
  const encodedDesc = encodeURIComponent(content.description);
  const encodedUrl = encodeURIComponent(content.url);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedDesc}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(content.url);
    setCopied(true);
    toast({
      title: "Link copied to clipboard",
      description: "You can now paste the link anywhere to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSocialShare = (platform: string) => {
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank');
    toast({
      title: `Sharing on ${platform}`,
      description: "Opening share dialog in a new window",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Achievements</DialogTitle>
          <DialogDescription>
            Share your carbon offset achievements with your network
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex flex-col space-y-2 mb-4">
            <h3 className="text-sm font-medium">Share on social media</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2" 
                onClick={() => handleSocialShare('twitter')}
              >
                <Twitter className="h-5 w-5 text-sky-500" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('facebook')}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('linkedin')}
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
                LinkedIn
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium">Or copy link</h3>
            <div className="flex items-center space-x-2">
              <div className="border rounded-md px-3 py-2 flex-1 bg-muted text-sm truncate">
                {content.url}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
