
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Leaf, 
  FileCheck, 
  ShieldCheck, 
  GanttChart, 
  Search, 
  Menu,
  X
} from 'lucide-react';

export const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-carbonica-green-dark" />
              <span className="font-bold text-xl text-carbonica-green-dark">Carbonica</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" label="Dashboard" icon={<BarChart className="h-4 w-4" />} />
            <NavLink to="/projects" label="Projects" icon={<GanttChart className="h-4 w-4" />} />
            <NavLink to="/verification" label="Verification" icon={<FileCheck className="h-4 w-4" />} />
            <NavLink to="/registry" label="Public Registry" icon={<Search className="h-4 w-4" />} />
            <NavLink to="/compliance" label="Compliance" icon={<ShieldCheck className="h-4 w-4" />} />
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Connect Wallet</Button>
            <Button>Register Project</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-carbonica-green-dark focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Dashboard" icon={<BarChart className="h-5 w-5" />} />
            <MobileNavLink to="/projects" label="Projects" icon={<GanttChart className="h-5 w-5" />} />
            <MobileNavLink to="/verification" label="Verification" icon={<FileCheck className="h-5 w-5" />} />
            <MobileNavLink to="/registry" label="Public Registry" icon={<Search className="h-5 w-5" />} />
            <MobileNavLink to="/compliance" label="Compliance" icon={<ShieldCheck className="h-5 w-5" />} />
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">Connect Wallet</Button>
              <Button className="w-full">Register Project</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const NavLink = ({ to, label, icon }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-carbonica-green-dark flex items-center space-x-1 py-2 text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink = ({ to, label, icon }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-carbonica-green-dark flex items-center space-x-3 py-2 text-base font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
