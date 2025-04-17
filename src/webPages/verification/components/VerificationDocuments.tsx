
import React, { useState, useEffect } from 'react';
import { useVerification } from '@/contexts/VerificationContext';
import { VerificationDocument } from '@/types/model';
import { FileIcon, FileTextIcon, FilePenIcon, FileSpreadsheetIcon, ImageIcon, FileArchiveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface VerificationDocumentsProps {
  verificationId: string;
}

export const VerificationDocuments: React.FC<VerificationDocumentsProps> = ({ verificationId }) => {
  const { getDocumentsByVerificationId } = useVerification();
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const docs = await getDocumentsByVerificationId(verificationId);
        setDocuments(docs);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [verificationId, getDocumentsByVerificationId]);

  const getFileIcon = (fileType: string) => {
    switch(fileType.toLowerCase()) {
      case 'pdf':
        return <FileTextIcon className="h-5 w-5 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FilePenIcon className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheetIcon className="h-5 w-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon className="h-5 w-5 text-purple-500" />;
      case 'zip':
      case 'rar':
        return <FileArchiveIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Documentation</h3>
        {[1, 2].map(i => (
          <div key={i} className="flex items-center gap-2 p-2 border border-gray-100 rounded-md">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="py-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Documentation</h3>
        <p className="text-sm text-gray-400 italic">No documents available</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Documentation ({documents.length})</h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div 
            key={doc.id}
            className="flex items-center gap-3 p-3 border border-gray-100 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="p-1.5 bg-white rounded-md border border-gray-200">
              {getFileIcon(doc.fileType)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{doc.name}</p>
              <p className="text-xs text-gray-500">
                {doc.description || 'No description'} • Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={doc.fileUrl} target="_blank" rel="noreferrer">View</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
