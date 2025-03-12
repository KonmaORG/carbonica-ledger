
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectRegister from "./pages/ProjectRegister";
import Verification from "./pages/Verification";
import Registry from "./pages/Registry";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";

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
