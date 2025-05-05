// lib/supabase-server.ts
import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
