import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';

const ReviewList = ({ children, className }: BaseComponentProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-[18px] md:gap-5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ReviewList;
