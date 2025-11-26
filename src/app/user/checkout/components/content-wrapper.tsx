import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';

export const ContentWrapper = ({
  title,
  className,
  children,
}: { title: string } & BaseComponentProps) => (
  <div className={cn('space-y-3', className)}>
    <h2 className='text-sm-bold md:text-md-bold'>{title}</h2>
    {children}
  </div>
);
