import { z } from 'zod';

const publicEnvironmentSchema = z
  .object({
    VITE_APP_NAME: z.string().trim().min(1).optional(),
    VITE_DATA_MODE: z.enum(['mock', 'live']).default('live'),
    VITE_SUPABASE_URL: z.url().optional(),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string().trim().min(1).optional(),
    VITE_MAP_STYLE_URL: z.url().optional(),
  })
  .transform((value) => ({
    appName: value.VITE_APP_NAME ?? 'APP_NAME',
    dataMode: value.VITE_DATA_MODE,
    supabaseUrl: value.VITE_SUPABASE_URL,
    supabasePublishableKey: value.VITE_SUPABASE_PUBLISHABLE_KEY,
    mapStyleUrl: value.VITE_MAP_STYLE_URL,
  }));

export type PublicEnvironment = z.infer<typeof publicEnvironmentSchema>;

export function readPublicEnvironment(
  source: Record<string, string | boolean | undefined> = import.meta.env,
): PublicEnvironment {
  return publicEnvironmentSchema.parse(source);
}

export const publicEnvironment = readPublicEnvironment();
