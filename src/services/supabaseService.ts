
import { supabase } from '../lib/supabase';
import { User, Project, VerificationRequest, VerificationDocument, VerificationEvent } from '../types/model';
import { Database } from '../lib/database.types';

/**
 * Supabase Data Service
 * 
 * This service provides data access methods for the application,
 * using Supabase as the backend.
 */
class SupabaseService {
  // Users
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*');
      
    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
    
    return data || [];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching user:', error);
      throw error;
    }
    
    return data;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
      
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    return this.mapDbProjectsToModel(data || []);
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching project:', error);
      throw error;
    }
    
    return data ? this.mapDbProjectToModel(data) : undefined;
  }

  async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('developer_id', developerId);
      
    if (error) {
      console.error('Error fetching developer projects:', error);
      throw error;
    }
    
    return this.mapDbProjectsToModel(data || []);
  }

  // Verification Requests
  async getVerificationRequests(): Promise<VerificationRequest[]> {
    const { data, error } = await supabase
      .from('verification_requests')
      .select(`
        *,
        verification_documents(*),
        verification_events(*)
      `);
      
    if (error) {
      console.error('Error fetching verification requests:', error);
      throw error;
    }
    
    return this.mapDbVerificationRequestsToModel(data || []);
  }

  async getVerificationRequestById(id: string): Promise<VerificationRequest | undefined> {
    const { data, error } = await supabase
      .from('verification_requests')
      .select(`
        *,
        verification_documents(*),
        verification_events(*)
      `)
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching verification request:', error);
      throw error;
    }
    
    return data ? this.mapDbVerificationRequestToModel(data) : undefined;
  }

  async getVerificationRequestsByProject(projectId: string): Promise<VerificationRequest[]> {
    const { data, error } = await supabase
      .from('verification_requests')
      .select(`
        *,
        verification_documents(*),
        verification_events(*)
      `)
      .eq('project_id', projectId);
      
    if (error) {
      console.error('Error fetching project verification requests:', error);
      throw error;
    }
    
    return this.mapDbVerificationRequestsToModel(data || []);
  }

  async getVerificationRequestsByDeveloper(developerId: string): Promise<VerificationRequest[]> {
    const { data, error } = await supabase
      .from('verification_requests')
      .select(`
        *,
        verification_documents(*),
        verification_events(*)
      `)
      .eq('developer_id', developerId);
      
    if (error) {
      console.error('Error fetching developer verification requests:', error);
      throw error;
    }
    
    return this.mapDbVerificationRequestsToModel(data || []);
  }

  async getVerificationRequestsByVerifier(verifierId: string): Promise<VerificationRequest[]> {
    const { data, error } = await supabase
      .from('verification_requests')
      .select(`
        *,
        verification_documents(*),
        verification_events(*)
      `)
      .eq('verifier_id', verifierId);
      
    if (error) {
      console.error('Error fetching verifier verification requests:', error);
      throw error;
    }
    
    return this.mapDbVerificationRequestsToModel(data || []);
  }

  // Verification Documents
  async getDocumentsByVerificationId(verificationId: string): Promise<VerificationDocument[]> {
    const { data, error } = await supabase
      .from('verification_documents')
      .select('*')
      .eq('verification_id', verificationId);
      
    if (error) {
      console.error('Error fetching verification documents:', error);
      throw error;
    }
    
    return this.mapDbVerificationDocumentsToModel(data || []);
  }

  // Verification Timeline Events
  async getTimelineByVerificationId(verificationId: string): Promise<VerificationEvent[]> {
    const { data, error } = await supabase
      .from('verification_events')
      .select('*')
      .eq('verification_id', verificationId)
      .order('timestamp', { ascending: true });
      
    if (error) {
      console.error('Error fetching verification timeline:', error);
      throw error;
    }
    
    return this.mapDbVerificationEventsToModel(data || []);
  }

  // Upload document file
  async uploadDocument(
    verificationId: string, 
    file: File,
    name: string,
    description?: string
  ): Promise<VerificationDocument> {
    // 1. Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${verificationId}/${fileName}`;
    
    const { error: uploadError } = await supabase
      .storage
      .from('project_documents')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error('Error uploading document:', uploadError);
      throw uploadError;
    }
    
    // 2. Get the URL for the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('project_documents')
      .getPublicUrl(filePath);
    
    // 3. Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // 4. Save document metadata to database
    const { data, error } = await supabase
      .from('verification_documents')
      .insert({
        verification_id: verificationId,
        name,
        file_url: publicUrl,
        file_type: fileExt || 'unknown',
        uploaded_by: user.id,
        description
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error saving document metadata:', error);
      throw error;
    }
    
    return this.mapDbVerificationDocumentToModel(data);
  }

  // Add verification request
  async createVerificationRequest(projectId: string, projectName: string): Promise<VerificationRequest> {
    // 1. Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // 2. Create verification request
    const { data, error } = await supabase
      .from('verification_requests')
      .insert({
        project_id: projectId,
        project_name: projectName,
        submitted_date: new Date().toISOString(),
        status: 'pending',
        progress: 0,
        developer_id: user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating verification request:', error);
      throw error;
    }
    
    // 3. Create initial timeline event
    await this.addTimelineEvent({
      verification_id: data.id,
      event_type: 'submission',
      message: 'Verification request submitted',
      user_id: user.id
    });
    
    // 4. Fetch the full verification request with documents and timeline
    return await this.getVerificationRequestById(data.id) as VerificationRequest;
  }

  // Update verification request
  async updateVerificationRequest(
    id: string, 
    updates: Partial<VerificationRequest>
  ): Promise<VerificationRequest> {
    const { data, error } = await supabase
      .from('verification_requests')
      .update({
        status: updates.status,
        progress: updates.progress,
        verifier_id: updates.verifierId,
        expected_completion: updates.expectedCompletion,
        rejection_reason: updates.rejectionReason,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating verification request:', error);
      throw error;
    }
    
    // Fetch the full verification request with documents and timeline
    return await this.getVerificationRequestById(data.id) as VerificationRequest;
  }

  // Add timeline event
  async addTimelineEvent(event: {
    verification_id: string;
    event_type: 'submission' | 'assignment' | 'review' | 'request_changes' | 'approval' | 'rejection';
    message: string;
    user_id: string;
    metadata?: Record<string, any>;
  }): Promise<VerificationEvent> {
    const { data, error } = await supabase
      .from('verification_events')
      .insert({
        verification_id: event.verification_id,
        event_type: event.event_type,
        message: event.message,
        user_id: event.user_id,
        metadata: event.metadata
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error adding timeline event:', error);
      throw error;
    }
    
    return this.mapDbVerificationEventToModel(data);
  }

  // Approve verification
  async approveVerification(id: string, notes?: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // Start a transaction
    const { error } = await supabase.rpc('approve_verification', {
      verification_id: id,
      approver_id: user.id,
      approval_notes: notes || 'Verification request approved'
    });
    
    if (error) {
      console.error('Error approving verification:', error);
      throw error;
    }
    
    return true;
  }

  // Reject verification
  async rejectVerification(id: string, reason: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // Update verification request
    const { error: updateError } = await supabase
      .from('verification_requests')
      .update({
        status: 'rejected',
        progress: 100,
        rejection_reason: reason,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
      
    if (updateError) {
      console.error('Error rejecting verification:', updateError);
      throw updateError;
    }
    
    // Add timeline event
    await this.addTimelineEvent({
      verification_id: id,
      event_type: 'rejection',
      message: `Verification request rejected: ${reason}`,
      user_id: user.id
    });
    
    return true;
  }

  // Assign verifier
  async assignVerifier(verificationId: string, verifierId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // Get verifier details
    const verifier = await this.getUserById(verifierId);
    if (!verifier) throw new Error('Verifier not found');
    
    // Update verification request
    const { error: updateError } = await supabase
      .from('verification_requests')
      .update({
        verifier_id: verifierId,
        status: 'in_review',
        progress: 30,
        updated_at: new Date().toISOString()
      })
      .eq('id', verificationId);
      
    if (updateError) {
      console.error('Error assigning verifier:', updateError);
      throw updateError;
    }
    
    // Add timeline event
    await this.addTimelineEvent({
      verification_id: verificationId,
      event_type: 'assignment',
      message: `Assigned to ${verifier.name}`,
      user_id: user.id
    });
    
    return true;
  }

  // Mapping functions from database model to app model
  private mapDbProjectToModel(dbProject: Database['public']['Tables']['projects']['Row']): Project {
    return {
      id: dbProject.id,
      title: dbProject.title,
      type: dbProject.type,
      location: dbProject.location,
      startDate: new Date(dbProject.start_date).toLocaleDateString(),
      status: dbProject.status,
      credits: dbProject.credits,
      thumbnailUrl: dbProject.thumbnail_url || undefined,
      description: dbProject.description || undefined,
      developer: dbProject.developer_id || undefined,
      verificationId: dbProject.verification_id || undefined,
      methodology: dbProject.methodology || undefined,
      verifier: dbProject.verifier_id || undefined,
      verificationDate: dbProject.verification_date ? new Date(dbProject.verification_date).toLocaleDateString() : undefined,
      createdAt: dbProject.created_at,
      updatedAt: dbProject.updated_at
    };
  }

  private mapDbProjectsToModel(dbProjects: Database['public']['Tables']['projects']['Row'][]): Project[] {
    return dbProjects.map(dbProject => this.mapDbProjectToModel(dbProject));
  }

  private mapDbVerificationRequestToModel(dbRequest: any): VerificationRequest {
    // Handle the nested data from the join
    const documents = dbRequest.verification_documents || [];
    const events = dbRequest.verification_events || [];

    return {
      id: dbRequest.id,
      projectId: dbRequest.project_id,
      projectName: dbRequest.project_name,
      submittedDate: new Date(dbRequest.submitted_date).toLocaleDateString(),
      status: dbRequest.status,
      progress: dbRequest.progress,
      verifierId: dbRequest.verifier_id || undefined,
      verifier: dbRequest.verifier_name || undefined, // This would come from a join if needed
      expectedCompletion: dbRequest.expected_completion ? new Date(dbRequest.expected_completion).toLocaleDateString() : undefined,
      rejectionReason: dbRequest.rejection_reason || undefined,
      developerId: dbRequest.developer_id,
      version: dbRequest.version,
      createdAt: dbRequest.created_at,
      updatedAt: dbRequest.updated_at,
      documents: this.mapDbVerificationDocumentsToModel(documents),
      timeline: this.mapDbVerificationEventsToModel(events)
    };
  }

  private mapDbVerificationRequestsToModel(dbRequests: any[]): VerificationRequest[] {
    return dbRequests.map(dbRequest => this.mapDbVerificationRequestToModel(dbRequest));
  }

  private mapDbVerificationDocumentToModel(dbDocument: any): VerificationDocument {
    return {
      id: dbDocument.id,
      verificationId: dbDocument.verification_id,
      name: dbDocument.name,
      fileUrl: dbDocument.file_url,
      fileType: dbDocument.file_type,
      uploadedBy: dbDocument.uploaded_by,
      uploadedAt: dbDocument.uploaded_at,
      description: dbDocument.description || undefined
    };
  }

  private mapDbVerificationDocumentsToModel(dbDocuments: any[]): VerificationDocument[] {
    return dbDocuments.map(dbDocument => this.mapDbVerificationDocumentToModel(dbDocument));
  }

  private mapDbVerificationEventToModel(dbEvent: any): VerificationEvent {
    return {
      id: dbEvent.id,
      verificationId: dbEvent.verification_id,
      timestamp: dbEvent.timestamp,
      eventType: dbEvent.event_type,
      message: dbEvent.message,
      userId: dbEvent.user_id,
      userName: dbEvent.user_name || undefined,
      metadata: dbEvent.metadata || undefined
    };
  }

  private mapDbVerificationEventsToModel(dbEvents: any[]): VerificationEvent[] {
    return dbEvents.map(dbEvent => this.mapDbVerificationEventToModel(dbEvent));
  }
}

// Export a singleton instance
export const supabaseService = new SupabaseService();
