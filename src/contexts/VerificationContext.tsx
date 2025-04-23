"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { supabaseService } from "../services/supabaseService";
import {
  VerificationRequest,
  VerificationDocument,
  VerificationEvent,
  Project,
  User,
} from "../types/model";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface VerificationContextType {
  // Data
  verificationRequests: VerificationRequest[];
  setVerificationRequests: React.Dispatch<
    React.SetStateAction<VerificationRequest[]>
  >;
  projects: Project[];
  users: User[];

  // Loading states
  loading: boolean;

  // Getters
  getVerificationById: (id: string) => VerificationRequest | undefined;
  getProjectById: (id: string) => Project | undefined;
  getUserById: (id: string) => User | undefined;
  getDocumentsByVerificationId: (id: string) => Promise<VerificationDocument[]>;
  getTimelineByVerificationId: (id: string) => Promise<VerificationEvent[]>;

  // Actions
  approveVerification: (id: string, notes?: string) => Promise<boolean>;
  rejectVerification: (id: string, reason: string) => Promise<boolean>;
  assignVerifier: (
    verificationId: string,
    verifierId: string
  ) => Promise<boolean>;
  addTimelineEvent: (
    verificationId: string,
    event: Partial<VerificationEvent>
  ) => Promise<boolean>;
  createVerificationRequest: (
    projectId: string,
    projectName: string
  ) => Promise<VerificationRequest>;
  uploadDocument: (
    verificationId: string,
    file: File,
    name: string,
    description?: string
  ) => Promise<VerificationDocument>;
}

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const [verificationRequests, setVerificationRequests] = useState<
    VerificationRequest[]
  >([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [requestsData, projectsData, usersData] = await Promise.all([
          supabaseService.getVerificationRequests(),
          supabaseService.getProjects(),
          supabaseService.getUsers(),
        ]);

        setVerificationRequests(requestsData);
        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to load verification data:", error);
        toast({
          title: "Error",
          description:
            "Failed to load verification data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast, isAuthenticated]);

  const getVerificationById = (id: string) => {
    return verificationRequests.find((request) => request.id === id);
  };

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id);
  };

  const getDocumentsByVerificationId = async (id: string) => {
    return supabaseService.getDocumentsByVerificationId(id);
  };

  const getTimelineByVerificationId = async (id: string) => {
    return supabaseService.getTimelineByVerificationId(id);
  };

  const approveVerification = async (
    id: string,
    notes?: string
  ): Promise<boolean> => {
    try {
      const result = await supabaseService.approveVerification(id, notes);

      // Refresh the verification list
      const updatedRequests = await supabaseService.getVerificationRequests();
      setVerificationRequests(updatedRequests);

      toast({
        title: "Success",
        description: "Verification has been approved",
      });

      return result;
    } catch (error) {
      console.error("Failed to approve verification:", error);
      toast({
        title: "Error",
        description: "Failed to approve verification. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const rejectVerification = async (
    id: string,
    reason: string
  ): Promise<boolean> => {
    try {
      const result = await supabaseService.rejectVerification(id, reason);

      // Refresh the verification list
      const updatedRequests = await supabaseService.getVerificationRequests();
      setVerificationRequests(updatedRequests);

      toast({
        title: "Verification Rejected",
        description: "The verification request has been rejected",
      });

      return result;
    } catch (error) {
      console.error("Failed to reject verification:", error);
      toast({
        title: "Error",
        description: "Failed to reject verification. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const assignVerifier = async (
    verificationId: string,
    verifierId: string
  ): Promise<boolean> => {
    try {
      const result = await supabaseService.assignVerifier(
        verificationId,
        verifierId
      );

      // Refresh the verification list
      const updatedRequests = await supabaseService.getVerificationRequests();
      setVerificationRequests(updatedRequests);

      const verifier = users.find((user) => user.id === verifierId);
      toast({
        title: "Verifier Assigned",
        description: `${
          verifier?.name || "A verifier"
        } has been assigned to this verification`,
      });

      return result;
    } catch (error) {
      console.error("Failed to assign verifier:", error);
      toast({
        title: "Error",
        description: "Failed to assign verifier. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const addTimelineEvent = async (
    verificationId: string,
    eventData: Partial<VerificationEvent>
  ): Promise<boolean> => {
    try {
      const event = await supabaseService.addTimelineEvent({
        verification_id: verificationId,
        event_type: eventData.eventType || "review",
        message: eventData.message || "Review comment added",
        user_id: eventData.userId || "",
        metadata: eventData.metadata,
      });

      // Refresh the verification list to include the new event
      const updatedRequests = await supabaseService.getVerificationRequests();
      setVerificationRequests(updatedRequests);

      return true;
    } catch (error) {
      console.error("Failed to add timeline event:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const createVerificationRequest = async (
    projectId: string,
    projectName: string
  ): Promise<VerificationRequest> => {
    try {
      const newRequest = await supabaseService.createVerificationRequest(
        projectId,
        projectName
      );

      // Add to the local state
      setVerificationRequests((prev) => [...prev, newRequest]);

      toast({
        title: "Success",
        description: "Verification request submitted successfully",
      });

      return newRequest;
    } catch (error) {
      console.error("Failed to create verification request:", error);
      toast({
        title: "Error",
        description: "Failed to submit verification request. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const uploadDocument = async (
    verificationId: string,
    file: File,
    name: string,
    description?: string
  ): Promise<VerificationDocument> => {
    try {
      const newDocument = await supabaseService.uploadDocument(
        verificationId,
        file,
        name,
        description
      );

      // Update the verification request with the new document
      const updatedRequests = verificationRequests.map((req) => {
        if (req.id === verificationId) {
          return {
            ...req,
            documents: [...req.documents, newDocument],
          };
        }
        return req;
      });

      setVerificationRequests(updatedRequests);

      toast({
        title: "Document Uploaded",
        description: "The document was uploaded successfully",
      });

      return newDocument;
    } catch (error) {
      console.error("Failed to upload document:", error);
      toast({
        title: "Error",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const contextValue: VerificationContextType = {
    verificationRequests,
    setVerificationRequests,
    projects,
    users,
    loading,
    getVerificationById,
    getProjectById,
    getUserById,
    getDocumentsByVerificationId,
    getTimelineByVerificationId,
    approveVerification,
    rejectVerification,
    assignVerifier,
    addTimelineEvent,
    createVerificationRequest,
    uploadDocument,
  };

  return (
    <VerificationContext.Provider value={contextValue}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return context;
};
