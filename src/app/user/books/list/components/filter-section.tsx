import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

export const FilterSectionTitle = ({
  children,
  className,
}: BaseComponentProps) => {
  return (
    <h2 className={cn('px-4 text-lg font-bold text-neutral-900', className)}>
      {children}
    </h2>
  );
};

type Props = {
  title: string;
} & BaseComponentProps;

export const FilterSection = ({ title, className, children }: Props) => {
  return (
    <div className={cn('space-y-2.5 px-4 pb-4', className)}>
      <h1 className='text-lg-bold'>{title}</h1>

      {children}
    </div>
  );
};

type FilterCheckboxItemProps = {
  id: string;
  label: React.ReactNode;
};

export const FilterCheckboxItem = ({ id, label }: FilterCheckboxItemProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Checkbox id={id} />
      <Label htmlFor={id} className='text-md-semibold'>
        {label}
      </Label>
    </div>
  );
};

type RatingFilterItemProps = {
  rating: number;
};

export const RatingFilterItem = ({ rating }: RatingFilterItemProps) => {
  const id = `rating-${rating}`;

  return (
    <div className='flex items-center gap-3'>
      <Checkbox id={id} />
      <Label
        htmlFor={id}
        className='flex items-center gap-2.5 cursor-pointer text-md-semibold select-none'
      >
        <Star size={20} className='text-yellow-500 fill-yellow-500' />
        <span className='text-neutral-800'>{rating}</span>
      </Label>
    </div>
  );
};
