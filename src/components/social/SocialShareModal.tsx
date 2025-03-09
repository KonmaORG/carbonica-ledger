
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  Mail, 
  MessageCircle, 
  Share2,
  Instagram,
  Globe,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
    whatsapp: `https://api.whatsapp.com/send?text=${encodedDesc}%20${encodedUrl}`,
    instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Note: Instagram doesn't support direct sharing via URL
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedDesc}`
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

  const socialPlatforms = [
    { name: 'Twitter', icon: <Twitter className="h-5 w-5 text-sky-500" />, action: () => handleSocialShare('twitter') },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5 text-blue-600" />, action: () => handleSocialShare('facebook') },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5 text-blue-700" />, action: () => handleSocialShare('linkedin') },
    { name: 'Email', icon: <Mail className="h-5 w-5 text-gray-600" />, action: () => handleSocialShare('email') },
    { name: 'WhatsApp', icon: <MessageCircle className="h-5 w-5 text-green-500" />, action: () => handleSocialShare('whatsapp') },
    { name: 'Telegram', icon: <Globe className="h-5 w-5 text-blue-400" />, action: () => handleSocialShare('telegram') },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this content</DialogTitle>
          <DialogDescription>
            Choose how you want to share "{content.title.substring(0, 40)}{content.title.length > 40 ? '...' : ''}"
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="social" className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="copy">Copy Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2" 
                onClick={() => handleSocialShare('twitter')}
              >
                <Twitter className="h-6 w-6 text-sky-500" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2"
                onClick={() => handleSocialShare('facebook')}
              >
                <Facebook className="h-6 w-6 text-blue-600" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2"
                onClick={() => handleSocialShare('linkedin')}
              >
                <Linkedin className="h-6 w-6 text-blue-700" />
                <span className="text-xs">LinkedIn</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="messaging" className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2"
                onClick={() => handleSocialShare('email')}
              >
                <Mail className="h-6 w-6 text-gray-600" />
                <span className="text-xs">Email</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2"
                onClick={() => handleSocialShare('whatsapp')}
              >
                <MessageCircle className="h-6 w-6 text-green-500" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center p-4 h-auto gap-2"
                onClick={() => handleSocialShare('telegram')}
              >
                <Globe className="h-6 w-6 text-blue-400" />
                <span className="text-xs">Telegram</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="copy" className="mt-4">
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-md break-all text-sm">
                {content.url}
              </div>
              <Button 
                variant="default" 
                className="w-full gap-2"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy to clipboard"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {navigator.share && (
          <div className="mt-4 pt-4 border-t">
            <Button 
              className="w-full bg-gradient-to-r from-carbonica-green-dark to-carbonica-blue-dark text-white hover:opacity-90 gap-2"
              onClick={handleNativeShare}
            >
              <Smartphone className="h-4 w-4" />
              Share using device options
            </Button>
          </div>
        )}
        
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Sharing this content helps spread awareness about carbon offset initiatives
        </div>
      </DialogContent>
    </Dialog>
  );
};
