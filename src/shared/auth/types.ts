import type { Session, User } from '@supabase/supabase-js';

import type { Me } from '@/shared/contracts';

export interface AuthSnapshot {
  session: Session | null;
  user: User | null;
  currentUser: Me | null;
  loading: boolean;
}

export interface AuthPort {
  getSnapshot(): AuthSnapshot;
  signOut(): Promise<void>;
}
