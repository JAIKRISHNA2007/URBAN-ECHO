import { MapPinned } from 'lucide-react';

import { publicEnvironment } from '@/shared/config/env';

import { LanguageToggle } from './LanguageToggle';

export function AppHeader() {
  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex min-h-16 max-w-[75rem] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-control bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center">
            <MapPinned aria-hidden="true" size={22} />
          </span>
          <span className="truncate text-lg font-semibold">
            {publicEnvironment.appName}
          </span>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}
