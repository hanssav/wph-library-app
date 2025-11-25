import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';
import type { ComponentProps } from 'react';

type CheckoutWrapperProps = { title?: string } & BaseComponentProps &
  ComponentProps<'div'>;

export const CheckoutTitle = ({
  children,
  className,
  sizeLg,
}: { sizeLg?: boolean } & BaseComponentProps) => (
  <h2
    className={cn(
      sizeLg
        ? 'text-xl-bold lg:text-display-sm-bold'
        : 'text-lg-bold lg:text-display-xs-bold',
      className
    )}
  >
    {children}
  </h2>
);

export const CheckoutWrapper = ({
  children,
  className,
  title,
  ...props
}: CheckoutWrapperProps) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {title && <CheckoutTitle>{title}</CheckoutTitle>}

      {children}
    </div>
  );
};
