import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Initialize Supabase client with the environment variables
// When Supabase is connected through Lovable, these variables are automatically injected
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a temporary client with dummy values if environment variables are not available
// This prevents the app from crashing during development or when Supabase is not fully set up
const url = "https://placeholder-url.supabase.co";
const key = "placeholder-key";

export const supabase: SupabaseClient<Database> = createClient(url, key);

// Auth helper functions
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (
  email: string,
  password: string,
  metadata: { name: string; company: string; role: string }
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Check if user has specific role
export const hasRole = async (role: string) => {
  const user = await getCurrentUser();
  return user?.user_metadata?.role === role;
};
