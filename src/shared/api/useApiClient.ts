import { useContext } from 'react';

import { ApiContext } from './api-context';
import type { ApiClient } from './client';

export function useApiClient(): ApiClient {
  const client = useContext(ApiContext);

  if (!client) {
    throw new Error('useApiClient must be used within ApiProvider.');
  }

  return client;
}
