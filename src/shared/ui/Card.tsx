import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        'rounded-card border-border bg-surface border p-5 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}
