import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. Bypasses RLS, so it
 * must never be imported into client components. Use for trusted server-side
 * reads/writes (sensor ingestion, dashboard queries) now that the `sensors`
 * table denies anon access.
 */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
