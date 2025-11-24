import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export default function StarrRating({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-0.5 items-center', className)} {...props}>
      <Star className='fill-[#FFAB0D] stroke-[#FFAB0D] size-4' />
      <span className='text-sm-semibold lg:text-md-semibold'>{children}</span>
    </div>
  );
}
