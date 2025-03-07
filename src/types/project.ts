
// Project-related type definitions
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  startDate: string;
  status: 'verified' | 'pending' | 'rejected';
  credits: number;
  thumbnailUrl?: string;
}
