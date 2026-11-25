import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { PublicEnvironment } from '@/shared/config/env';

export function createBrowserSupabaseClient(
  environment: PublicEnvironment,
): SupabaseClient | null {
  if (!environment.supabaseUrl || !environment.supabasePublishableKey) {
    return null;
  }

  return createClient(
    environment.supabaseUrl,
    environment.supabasePublishableKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );
}
