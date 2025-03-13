"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout";
import Index from "../componentpages/Index";
import Projects from "../componentpages/Projects";
import ProjectDetails from "../componentpages/ProjectDetails";
import ProjectRegister from "../componentpages/ProjectRegister";
import Verification from "../componentpages/Verification";
import Registry from "../componentpages/Registry";
import Compliance from "../componentpages/Compliance";
import NotFound from "../componentpages/NotFound";
import UserProfile from "../componentpages/UserProfile";
import Settings from "../componentpages/Settings";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/register" element={<ProjectRegister />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
