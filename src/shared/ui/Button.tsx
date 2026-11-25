import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-4 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'border border-border bg-surface text-foreground hover:bg-secondary',
        ghost: 'text-foreground hover:bg-secondary',
      },
      size: {
        default: 'min-h-11 px-4',
        compact: 'min-h-11 px-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    />
  );
}
