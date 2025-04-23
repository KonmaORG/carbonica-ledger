// Project-related type definitions
export interface ProjectType {
  id: string;
  title: string;
  type: string;
  location: string;
  startDate: string;
  status: "verified" | "pending" | "rejected";
  emissionsTarget: string;
  description?: string;
  estimatedCompletion?: string;
  documents?: ProjectDocument[];
  developer?: string;
  verifier?: string;
}

export type ProjectDocumentUpload = {
  file: File; // Use the standard File API type
  name: string; // File name (e.g., "report.pdf")
  type: string; // MIME type (e.g., "application/pdf")
  url: string; // Client-side URL for preview (from URL.createObjectURL)
  isThumbnail?: boolean;
};

export type ProjectDocument = {
  file_name: string;
  file_path: string;
  file_type: string;
};
