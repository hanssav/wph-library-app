import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';
import { type ComponentProps } from 'react';

type FilterBadgeProps = BaseComponentProps & ComponentProps<'div'>;

const FilterBadge = ({ className, children, ...props }: FilterBadgeProps) => {
  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {children}
    </div>
  );
};

type BadgeData = {
  label: string;
  id: string;
};
type FilterBadgeItemProps = {
  data: BadgeData;
  active?: boolean;
} & BaseComponentProps &
  ComponentProps<'div'>;

const FilterBadgeItem = ({
  children,
  className,
  data,
  active,
  ...props
}: FilterBadgeItemProps) => {
  return (
    <div
      className={cn(
        'border border-neutral-300 max-h-10 flex-center py-2 px-4 rounded-[100px] text-sm-semibold md:text-md-semibold cursor-pointer',
        active && 'border-primary-500 bg-[#F6F9FE] text-primary-500'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export { FilterBadge, FilterBadgeItem };
