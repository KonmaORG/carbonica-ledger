
import {
  User,
  Project,
  VerificationRequest,
  VerificationDocument,
  VerificationEvent,
  VerificationComment,
  CreditEntry,
  CreditTransaction
} from '../types/model';

import {
  MOCK_USERS,
  MOCK_PROJECTS,
  MOCK_VERIFICATION_REQUESTS,
  MOCK_CREDIT_ENTRIES,
  MOCK_CREDIT_TRANSACTIONS
} from '../data/mockData';

/**
 * Data Service
 * 
 * This service provides data access methods for the application,
 * abstracting away the data source (mock data now, could be API later).
 */
class DataService {
  // Users
  async getUsers(): Promise<User[]> {
    return Promise.resolve([...MOCK_USERS]);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return Promise.resolve(MOCK_USERS.find(user => user.id === id));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Promise.resolve([...MOCK_PROJECTS]);
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return Promise.resolve(MOCK_PROJECTS.find(project => project.id === id));
  }

  async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    return Promise.resolve(MOCK_PROJECTS.filter(project => project.developer === developerId));
  }

  // Verification Requests
  async getVerificationRequests(): Promise<VerificationRequest[]> {
    return Promise.resolve([...MOCK_VERIFICATION_REQUESTS]);
  }

  async getVerificationRequestById(id: string): Promise<VerificationRequest | undefined> {
    return Promise.resolve(MOCK_VERIFICATION_REQUESTS.find(request => request.id === id));
  }

  async getVerificationRequestsByProject(projectId: string): Promise<VerificationRequest[]> {
    return Promise.resolve(MOCK_VERIFICATION_REQUESTS.filter(request => request.projectId === projectId));
  }

  async getVerificationRequestsByDeveloper(developerId: string): Promise<VerificationRequest[]> {
    return Promise.resolve(MOCK_VERIFICATION_REQUESTS.filter(request => request.developerId === developerId));
  }

  async getVerificationRequestsByVerifier(verifierId: string): Promise<VerificationRequest[]> {
    return Promise.resolve(MOCK_VERIFICATION_REQUESTS.filter(request => request.verifierId === verifierId));
  }

  // Verification Documents
  async getDocumentsByVerificationId(verificationId: string): Promise<VerificationDocument[]> {
    const request = MOCK_VERIFICATION_REQUESTS.find(req => req.id === verificationId);
    return Promise.resolve(request?.documents || []);
  }

  // Verification Timeline Events
  async getTimelineByVerificationId(verificationId: string): Promise<VerificationEvent[]> {
    const request = MOCK_VERIFICATION_REQUESTS.find(req => req.id === verificationId);
    return Promise.resolve(request?.timeline || []);
  }

  // Credit Entries
  async getCreditEntries(): Promise<CreditEntry[]> {
    return Promise.resolve([...MOCK_CREDIT_ENTRIES]);
  }

  async getCreditEntriesByOwner(ownerId: string): Promise<CreditEntry[]> {
    return Promise.resolve(MOCK_CREDIT_ENTRIES.filter(entry => entry.owner === ownerId));
  }

  async getCreditEntriesByProject(projectId: string): Promise<CreditEntry[]> {
    return Promise.resolve(MOCK_CREDIT_ENTRIES.filter(entry => entry.projectId === projectId));
  }

  // Credit Transactions
  async getCreditTransactions(): Promise<CreditTransaction[]> {
    return Promise.resolve([...MOCK_CREDIT_TRANSACTIONS]);
  }

  async getCreditTransactionsByUser(userId: string): Promise<CreditTransaction[]> {
    return Promise.resolve(
      MOCK_CREDIT_TRANSACTIONS.filter(
        tx => tx.senderId === userId || tx.recipientId === userId
      )
    );
  }

  async getCreditTransactionsByProject(projectId: string): Promise<CreditTransaction[]> {
    return Promise.resolve(MOCK_CREDIT_TRANSACTIONS.filter(tx => tx.projectId === projectId));
  }
}

// Export a singleton instance
export const dataService = new DataService();
