
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link, Copy, Check, Mail, MessageCircle, Share2 } from 'lucide-react';
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
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedDesc}%20${encodedUrl}`
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

  // Use Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: content.url,
        });
        toast({
          title: "Shared successfully",
        });
      } catch (error) {
        // User cancelled or share failed
        console.error("Error sharing:", error);
      }
    } else {
      toast({
        title: "Native sharing not supported",
        description: "Please use one of the other sharing options.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this content with your network
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {navigator.share && (
            <div className="flex justify-center mb-4">
              <Button 
                className="w-full bg-gradient-to-r from-carbonica-green-dark to-carbonica-blue-dark text-white hover:opacity-90"
                onClick={handleNativeShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with device
              </Button>
            </div>
          )}
          
          <div className="flex flex-col space-y-2 mb-4">
            <h3 className="text-sm font-medium">Share on social media</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2" 
                onClick={() => handleSocialShare('twitter')}
              >
                <Twitter className="h-5 w-5 text-sky-500" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('facebook')}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('linkedin')}
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
                LinkedIn
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 mb-4">
            <h3 className="text-sm font-medium">Or share via</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('email')}
              >
                <Mail className="h-5 w-5 text-gray-600" />
                Email
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialShare('whatsapp')}
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                WhatsApp
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
                className="flex-shrink-0"
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
