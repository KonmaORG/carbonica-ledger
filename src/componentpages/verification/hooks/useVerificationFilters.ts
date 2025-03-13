
import { useState, useMemo } from 'react';
import { VerificationRequest } from '../types/verificationTypes';

type VerificationStatus = 'all' | 'pending' | 'in_review' | 'approved' | 'rejected';

export const useVerificationFilters = (requests: VerificationRequest[]) => {
  const [activeTab, setActiveTab] = useState<VerificationStatus>('all');

  const filteredRequests = useMemo(() => {
    if (activeTab === 'all') {
      return requests;
    }
    
    return requests.filter(request => request.status === activeTab);
  }, [requests, activeTab]);

  return {
    activeTab,
    setActiveTab,
    filteredRequests
  };
};
