
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { dataService } from '../services/dataService';
import { 
  VerificationRequest,
  VerificationDocument,
  VerificationEvent,
  Project,
  User
} from '../types/model';
import { useToast } from '@/hooks/use-toast';

interface VerificationContextType {
  // Data
  verificationRequests: VerificationRequest[];
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
  assignVerifier: (verificationId: string, verifierId: string) => Promise<boolean>;
  addTimelineEvent: (verificationId: string, event: Partial<VerificationEvent>) => Promise<boolean>;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [requestsData, projectsData, usersData] = await Promise.all([
          dataService.getVerificationRequests(),
          dataService.getProjects(),
          dataService.getUsers()
        ]);
        
        setVerificationRequests(requestsData);
        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to load verification data:', error);
        toast({
          title: "Error",
          description: "Failed to load verification data. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const getVerificationById = (id: string) => {
    return verificationRequests.find(request => request.id === id);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const getDocumentsByVerificationId = async (id: string) => {
    return dataService.getDocumentsByVerificationId(id);
  };

  const getTimelineByVerificationId = async (id: string) => {
    return dataService.getTimelineByVerificationId(id);
  };

  // Action: Approve verification
  const approveVerification = async (id: string, notes?: string): Promise<boolean> => {
    try {
      // In real application, this would make an API call
      // For now, we'll simulate by updating our local state
      const updatedRequests = verificationRequests.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'approved' as const,
            progress: 100,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...req.timeline,
              {
                id: `e${req.timeline.length + 1}`,
                verificationId: id,
                timestamp: new Date().toISOString(),
                eventType: 'approval' as const,
                message: notes || 'Verification request approved',
                userId: 'u2', // Mock user ID
                userName: 'Marcus Johnson' // Mock user name
              }
            ]
          };
        }
        return req;
      });

      setVerificationRequests(updatedRequests);
      
      toast({
        title: "Success",
        description: "Verification has been approved",
      });
      
      return true;
    } catch (error) {
      console.error('Failed to approve verification:', error);
      toast({
        title: "Error",
        description: "Failed to approve verification. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Action: Reject verification
  const rejectVerification = async (id: string, reason: string): Promise<boolean> => {
    try {
      // Similar to approve, but with rejection status
      const updatedRequests = verificationRequests.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'rejected' as const,
            progress: 100,
            rejectionReason: reason,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...req.timeline,
              {
                id: `e${req.timeline.length + 1}`,
                verificationId: id,
                timestamp: new Date().toISOString(),
                eventType: 'rejection' as const,
                message: `Verification request rejected: ${reason}`,
                userId: 'u2', // Mock user ID
                userName: 'Marcus Johnson' // Mock user name
              }
            ]
          };
        }
        return req;
      });

      setVerificationRequests(updatedRequests);
      
      toast({
        title: "Verification Rejected",
        description: "The verification request has been rejected",
      });
      
      return true;
    } catch (error) {
      console.error('Failed to reject verification:', error);
      toast({
        title: "Error",
        description: "Failed to reject verification. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Action: Assign verifier
  const assignVerifier = async (verificationId: string, verifierId: string): Promise<boolean> => {
    try {
      const verifier = users.find(user => user.id === verifierId);
      if (!verifier) throw new Error("Verifier not found");
      
      const updatedRequests = verificationRequests.map(req => {
        if (req.id === verificationId) {
          return {
            ...req,
            verifierId,
            verifier: verifier.name, // Keep the string name for backward compatibility
            status: 'in_review' as const,
            progress: Math.max(req.progress, 30), // Ensure progress is at least 30%
            updatedAt: new Date().toISOString(),
            timeline: [
              ...req.timeline,
              {
                id: `e${req.timeline.length + 1}`,
                verificationId,
                timestamp: new Date().toISOString(),
                eventType: 'assignment' as const,
                message: `Assigned to ${verifier.name}`,
                userId: 'admin', // Mock admin user
                userName: 'System Administrator'
              }
            ]
          };
        }
        return req;
      });

      setVerificationRequests(updatedRequests);
      
      toast({
        title: "Verifier Assigned",
        description: `${verifier.name} has been assigned to this verification`,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to assign verifier:', error);
      toast({
        title: "Error",
        description: "Failed to assign verifier. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Add timeline event
  const addTimelineEvent = async (
    verificationId: string, 
    eventData: Partial<VerificationEvent>
  ): Promise<boolean> => {
    try {
      const request = verificationRequests.find(req => req.id === verificationId);
      if (!request) throw new Error("Verification request not found");
      
      const newEvent: VerificationEvent = {
        id: `e${request.timeline.length + 1}`,
        verificationId,
        timestamp: new Date().toISOString(),
        eventType: eventData.eventType || 'review',
        message: eventData.message || 'Review comment added',
        userId: eventData.userId || 'u2',
        userName: eventData.userName || 'System User',
        metadata: eventData.metadata
      };
      
      const updatedRequests = verificationRequests.map(req => {
        if (req.id === verificationId) {
          return {
            ...req,
            timeline: [...req.timeline, newEvent],
            updatedAt: new Date().toISOString()
          };
        }
        return req;
      });

      setVerificationRequests(updatedRequests);
      return true;
    } catch (error) {
      console.error('Failed to add timeline event:', error);
      return false;
    }
  };

  const contextValue: VerificationContextType = {
    verificationRequests,
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
    addTimelineEvent
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
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
