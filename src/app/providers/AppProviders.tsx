import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

import { ApiProvider } from '@/shared/api';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: 1,
            staleTime: 30_000,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>{children}</ApiProvider>
    </QueryClientProvider>
  );
}
