
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-carbonica-green-dark" />
              <span className="font-bold text-lg text-carbonica-green-dark">Carbonica</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              A decentralized carbon offset project registry on the Cardano blockchain.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Platform</h3>
            <div className="mt-4 space-y-2">
              <FooterLink to="/projects" label="Projects" />
              <FooterLink to="/verification" label="Verification" />
              <FooterLink to="/registry" label="Public Registry" />
              <FooterLink to="/compliance" label="Compliance" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <div className="mt-4 space-y-2">
              <FooterLink to="/docs" label="Documentation" />
              <FooterLink to="/api" label="API Reference" />
              <FooterLink to="/standards" label="Verification Standards" />
              <FooterLink to="/faq" label="FAQ" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <div className="mt-4 space-y-2">
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/cookies" label="Cookie Policy" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-carbonica-green-dark">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-carbonica-green-dark">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Carbonica. All rights reserved.
          </p>
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
    <Link to={to} className="text-sm text-gray-600 hover:text-carbonica-green-dark">
      {label}
    </Link>
  );
};
