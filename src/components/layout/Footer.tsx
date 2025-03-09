
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Linkedin, Mail, Facebook, Instagram, ExternalLink, Heart, Copyright } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-white to-carbonica-neutral-light border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-7 w-7 text-carbonica-green-dark" />
              <span className="font-bold text-xl text-carbonica-green-dark">Carbonica</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              A decentralized carbon offset project registry on the Cardano blockchain, enabling transparent climate action.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="https://github.com" icon={<Github size={18} />} label="GitHub" />
              <SocialIcon href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
              <SocialIcon href="https://linkedin.com" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialIcon href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialIcon href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
            <div className="space-y-3">
              <FooterLink to="/projects" label="Projects" />
              <FooterLink to="/verification" label="Verification" />
              <FooterLink to="/registry" label="Public Registry" />
              <FooterLink to="/compliance" label="Compliance" />
              <FooterLink to="/profile" label="My Account" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <div className="space-y-3">
              <FooterLink to="/docs" label="Documentation" />
              <FooterLink to="/api" label="API Reference" />
              <FooterLink to="/standards" label="Verification Standards" />
              <FooterLink to="/faq" label="FAQ" />
              <ExternalFooterLink href="https://cardano.org" label="Cardano Blockchain" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Connect</h3>
            <div className="space-y-3">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/careers" label="Careers" />
              <div className="pt-3">
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Subscribe to newsletter" 
                    className="text-sm px-3 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-carbonica-green-dark"
                  />
                  <button 
                    type="submit" 
                    className="bg-carbonica-green-dark text-white px-3 py-2 text-sm font-medium rounded-r-md hover:bg-carbonica-green-light transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-gray-500 flex items-center">
              <Copyright className="h-3.5 w-3.5 mr-1.5" /> {currentYear} Carbonica. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/cookies" label="Cookie Policy" />
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-center md:justify-end text-sm text-gray-500">
            <span className="flex items-center">
              Made with <Heart className="h-3.5 w-3.5 mx-1 text-red-500" /> for a greener future
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink = ({ to, label }: FooterLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-sm text-gray-600 hover:text-carbonica-green-dark transition-colors flex items-center"
    >
      {label}
    </Link>
  );
};

interface ExternalFooterLinkProps {
  href: string;
  label: string;
}

const ExternalFooterLink = ({ href, label }: ExternalFooterLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-sm text-gray-600 hover:text-carbonica-green-dark transition-colors flex items-center"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5 ml-1.5 inline" />
    </a>
  );
};

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon = ({ href, icon, label }: SocialIconProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-500 hover:text-carbonica-green-dark transition-colors"
    >
      {icon}
    </a>
  );
};
