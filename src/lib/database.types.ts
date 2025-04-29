export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          project_id: string;
          title: string;
          type: string;
          location: string;
          start_date: string;
          status: "pending_verification" | "verified" | "rejected";
          credits: number;
          thumbnail_url: string | null;
          description: string | null;
          developer_id: string | null;
          verification_id: string | null;
          methodology: string | null;
          verifier_id: string | null;
          verification_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          project_id?: string;
          title: string;
          type: string;
          location: string;
          start_date: string;
          status: "pending_verification" | "verified" | "rejected";
          credits?: number;
          thumbnail_url?: string | null;
          description?: string | null;
          developer_id?: string | null;
          verification_id?: string | null;
          methodology?: string | null;
          verifier_id?: string | null;
          verification_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          title?: string;
          type?: string;
          location?: string;
          start_date?: string;
          status?: "pending_verification" | "verified" | "rejected";
          credits?: number;
          thumbnail_url?: string | null;
          description?: string | null;
          developer_id?: string | null;
          verification_id?: string | null;
          methodology?: string | null;
          verifier_id?: string | null;
          verification_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      verification_requests: {
        Row: {
          verification_id: string;
          project_id: string;
          project_name: string;
          submitted_date: string;
          status: "pending" | "in_review" | "approved" | "rejected";
          progress: number;
          verifier_id: string | null;
          expected_completion: string | null;
          rejection_reason: string | null;
          developer_id: string;
          version: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          verification_id?: string;
          project_id: string;
          project_name: string;
          submitted_date: string;
          status: "pending" | "in_review" | "approved" | "rejected";
          progress?: number;
          verifier_id?: string | null;
          expected_completion?: string | null;
          rejection_reason?: string | null;
          developer_id: string;
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          verification_id?: string;
          project_id?: string;
          project_name?: string;
          submitted_date?: string;
          status?: "pending" | "in_review" | "approved" | "rejected";
          progress?: number;
          verifier_id?: string | null;
          expected_completion?: string | null;
          rejection_reason?: string | null;
          developer_id?: string;
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      verification_documents: {
        Row: {
          id: string;
          verification_id: string;
          name: string;
          file_url: string;
          file_type: string;
          uploaded_by: string;
          uploaded_at: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          verification_id: string;
          name: string;
          file_url: string;
          file_type: string;
          uploaded_by: string;
          uploaded_at?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          verification_id?: string;
          name?: string;
          file_url?: string;
          file_type?: string;
          uploaded_by?: string;
          uploaded_at?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      verification_events: {
        Row: {
          id: string;
          verification_id: string;
          timestamp: string;
          event_type:
            | "submission"
            | "assignment"
            | "review"
            | "request_changes"
            | "approval"
            | "rejection";
          message: string;
          user_id: string;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          verification_id: string;
          timestamp?: string;
          event_type:
            | "submission"
            | "assignment"
            | "review"
            | "request_changes"
            | "approval"
            | "rejection";
          message: string;
          user_id: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          verification_id?: string;
          timestamp?: string;
          event_type?:
            | "submission"
            | "assignment"
            | "review"
            | "request_changes"
            | "approval"
            | "rejection";
          message?: string;
          user_id?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      verification_comments: {
        Row: {
          id: string;
          verification_id: string;
          user_id: string;
          text: string;
          timestamp: string;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          verification_id: string;
          user_id: string;
          text: string;
          timestamp?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          verification_id?: string;
          user_id?: string;
          text?: string;
          timestamp?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      credit_entries: {
        Row: {
          id: string;
          credit_id: string;
          project_id: string;
          quantity: number;
          vintage: string;
          status: "active" | "transferred" | "retired";
          issuance_date: string;
          last_action_date: string;
          owner_id: string;
          verification_id: string;
          serial_number: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          credit_id: string;
          project_id: string;
          quantity: number;
          vintage: string;
          status: "active" | "transferred" | "retired";
          issuance_date: string;
          last_action_date: string;
          owner_id: string;
          verification_id: string;
          serial_number: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          credit_id?: string;
          project_id?: string;
          quantity?: number;
          vintage?: string;
          status?: "active" | "transferred" | "retired";
          issuance_date?: string;
          last_action_date?: string;
          owner_id?: string;
          verification_id?: string;
          serial_number?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      credit_transactions: {
        Row: {
          id: string;
          transaction_type: "issuance" | "transfer" | "retirement";
          project_id: string;
          credit_id: string;
          amount: number;
          sender_id: string;
          recipient_id: string | null;
          status: "pending" | "completed" | "failed";
          transaction_hash: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          transaction_type: "issuance" | "transfer" | "retirement";
          project_id: string;
          credit_id: string;
          amount: number;
          sender_id: string;
          recipient_id?: string | null;
          status: "pending" | "completed" | "failed";
          transaction_hash?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          transaction_type?: "issuance" | "transfer" | "retirement";
          project_id?: string;
          credit_id?: string;
          amount?: number;
          sender_id?: string;
          recipient_id?: string | null;
          status?: "pending" | "completed" | "failed";
          transaction_hash?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
