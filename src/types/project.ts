// Project-related type definitions
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  startDate: string;
  status: "verified" | "pending" | "rejected";
  credits: number;
  thumbnailUrl?: string;
  description?: string;
  verificationDate?: string;
  methodology?: string;
  developer?: string;
  verifier?: string;
}

export type ProjectDocument = {
  file: File; // Use the standard File API type
  name: string; // File name (e.g., "report.pdf")
  type: string; // MIME type (e.g., "application/pdf")
  url: string; // Client-side URL for preview (from URL.createObjectURL)
  isThumbnail?: boolean;
};
