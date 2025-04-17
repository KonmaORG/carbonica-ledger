
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
import { VerificationProvider } from "./contexts/VerificationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <VerificationProvider>
        <BrowserRouter>
          <RootLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/projects/:id" element={
                <ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>
              } />
              <Route path="/projects/register" element={
                <ProtectedRoute>
                  <ProjectRegister />
                </ProtectedRoute>
              } />
              <Route path="/verification" element={
                <ProtectedRoute>
                  <Verification />
                </ProtectedRoute>
              } />
              <Route path="/registry" element={
                <ProtectedRoute>
                  <Registry />
                </ProtectedRoute>
              } />
              <Route path="/compliance" element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RootLayout>
        </BrowserRouter>
      </VerificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
