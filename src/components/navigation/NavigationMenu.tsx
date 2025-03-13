import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletConnectionDialog } from "@/components/wallet/WalletConnectionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Leaf,
  FileCheck,
  ShieldCheck,
  GanttChart,
  Search,
  Menu,
  X,
  UserCircle,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";
import WalletConnector from "../wallet/client";

export const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = React.useState(false);

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
              <span className="font-bold text-xl text-carbonica-green-dark">
                Carbonica
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              label="Dashboard"
              icon={<BarChart className="h-4 w-4" />}
            />
            <NavLink
              to="/projects"
              label="Projects"
              icon={<GanttChart className="h-4 w-4" />}
            />
            <NavLink
              to="/verification"
              label="Verification"
              icon={<FileCheck className="h-4 w-4" />}
            />
            <NavLink
              to="/registry"
              label="Public Registry"
              icon={<Search className="h-4 w-4" />}
            />
            <NavLink
              to="/compliance"
              label="Compliance"
              icon={<ShieldCheck className="h-4 w-4" />}
            />
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <WalletConnector />
            <Button
              variant="outline"
              onClick={() => setIsWalletDialogOpen(true)}
            >
              Connect Wallet
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span>My Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/projects/register"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Register Project</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink
              to="/"
              label="Dashboard"
              icon={<BarChart className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/projects"
              label="Projects"
              icon={<GanttChart className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/verification"
              label="Verification"
              icon={<FileCheck className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/registry"
              label="Public Registry"
              icon={<Search className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/compliance"
              label="Compliance"
              icon={<ShieldCheck className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/profile"
              label="My Profile"
              icon={<UserCircle className="h-5 w-5" />}
            />
            <MobileNavLink
              to="/projects/register"
              label="Register Project"
              icon={<FileText className="h-5 w-5" />}
            />
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">
                Connect Wallet
              </Button>
            </div>
          </nav>
        </div>
      )}

      <WalletConnectionDialog
        isOpen={isWalletDialogOpen}
        onClose={() => setIsWalletDialogOpen(false)}
      />
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
