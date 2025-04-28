/**
 * Core Entity Types for Carbonica Platform
 * This file defines the primary data models used across the application
 */

import { requestVotes } from "@/webPages/verification/types/verificationTypes";
import { ProjectDocument } from "./project";

// User entity
export interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string; // 'developer', 'verifier', 'administrator', 'buyer'
  avatarUrl: string;
  joinDate: string;
  totalCredits: number;
  activeCredits: number;
  retiredCredits: number;
  verifiedProjects: number;
  createdAt?: string;
  updatedAt?: string;
}

// Project entity
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  startDate: string;
  status: "pending_verification" | "verified" | "rejected";
  credits: number;
  thumbnailUrl?: string;
  description?: string;
  developer?: string; // User ID of the developer
  verificationId?: string; // Link to latest verification request
  methodology?: string;
  verifier?: string; // User ID of the verifier
  verificationDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced VerificationRequest entity

// New VerificationDocument entity
export interface VerificationDocument {
  id: string;
  verificationId: string;
  name: string;
  fileUrl: string;
  fileType: string; // e.g., 'pdf', 'docx', etc.
  uploadedBy: string; // User ID
  uploadedAt: string;
  description?: string;
}

// New VerificationEvent entity for timeline
export interface VerificationEvent {
  id: string;
  verificationId: string;
  timestamp: string;
  eventType:
    | "submission"
    | "assignment"
    | "review"
    | "request_changes"
    | "approval"
    | "rejection";
  message: string;
  userId: string; // User who created this event
  userName?: string; // Name of the user (transitional - will be removed once fully relational)
  metadata?: Record<string, any>; // Additional contextual info
}

// New VerificationComment entity
export interface VerificationComment {
  id: string;
  verificationId: string;
  userId: string;
  userName?: string; // (transitional)
  text: string;
  timestamp: string;
  parentId?: string; // For threaded comments
}

// Enhanced CreditEntry entity
export interface CreditEntry {
  id: string;
  creditId: string;
  projectId: string;
  projectName: string;
  projectType: string;
  location: string;
  quantity: number;
  vintage: string;
  status: "active" | "transferred" | "retired";
  issuanceDate: string;
  lastActionDate: string;
  owner: string; // User ID
  verificationId: string; // Link to the verification that resulted in these credits
  serialNumber: string; // Unique identifier for each credit token
  createdAt: string;
  updatedAt: string;
}

// Enhanced CreditTransaction entity
export interface CreditTransaction {
  id: string;
  date: string;
  type: "issuance" | "transfer" | "retirement";
  projectId: string;
  project: string; // Project name (transitional)
  creditId: string; // Reference to specific credit
  amount: number;
  senderId: string; // User ID of sender
  recipientId?: string; // User ID of recipient (if transfer)
  recipient?: string; // Name of recipient (transitional)
  status: "pending" | "completed" | "failed";
  transactionHash?: string; // For blockchain transactions
  metadata?: Record<string, any>; // Additional transaction data
  createdAt: string;
  updatedAt: string;
}
