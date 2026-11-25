import { type PropsWithChildren, useMemo } from 'react';

import { ApiContext } from './api-context';
import { createConfiguredApiClient } from './client';

export function ApiProvider({ children }: PropsWithChildren) {
  const client = useMemo(() => createConfiguredApiClient(), []);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}
