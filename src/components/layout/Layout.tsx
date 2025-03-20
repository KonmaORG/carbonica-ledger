import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="container mx-auto px-4 py-8">{children}</div>;
};
