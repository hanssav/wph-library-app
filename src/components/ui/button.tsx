import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[100px] cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-md font-bold text-white hover:bg-primary-500/90',
        destructive: '',
        outline: '',
        secondary: '',
        ghost: '',
        link: 'text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        link: 'h-12 px-1',
      },
      widthFull: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      widthFull: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  widthFull,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, widthFull, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
