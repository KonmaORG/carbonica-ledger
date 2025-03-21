import React from "react";
import { NavigationMenu } from "../navigation/NavigationMenu";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        {/* <NavigationMenu /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      {/* <Toaster />
      <Sonner /> */}
    </TooltipProvider>
  );
};
