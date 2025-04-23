import React, { useState, useEffect } from "react";
import { useVerification } from "@/contexts/VerificationContext";
import { VerificationDocument } from "@/types/model";
import {
  FileIcon,
  FileTextIcon,
  FilePenIcon,
  FileSpreadsheetIcon,
  ImageIcon,
  FileArchiveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectDocument } from "@/types/project";

interface VerificationDocumentsProps {
  documents: ProjectDocument[];
}

export const VerificationDocuments: React.FC<VerificationDocumentsProps> = ({
  documents,
}) => {
  const { getDocumentsByVerificationId } = useVerification();

  const getFileIcon = (fileUrl: string) => {
    const fileType = getFileTypeFromUrl(fileUrl);
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileTextIcon className="h-5 w-5 text-red-500" />;
      case "docx":
      case "doc":
        return <FilePenIcon className="h-5 w-5 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheetIcon className="h-5 w-5 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-purple-500" />;
      case "zip":
      case "rar":
        return <FileArchiveIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  function getFileTypeFromUrl(fileUrl) {
    if (!fileUrl) return null;
    const parts = fileUrl.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : null;
  }
  console.log("Documents: ", documents);

  if (documents.length === 0) {
    return (
      <div className="py-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Documentation
        </h3>
        <p className="text-sm text-gray-400 italic">No documents available</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h3 className="text-sm font-medium text-gray-500 mb-2">
        Documentation ({documents.length})
      </h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.file_path}
            className="flex items-center gap-3 p-3 border border-gray-100 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="p-1.5 bg-white rounded-md border border-gray-200">
              {getFileIcon(doc.file_path)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{doc.file_name}</p>
              <p className="text-xs text-gray-500">
                {"No description"} • Uploaded on {}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={doc.file_path} target="_blank" rel="noreferrer">
                View
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
