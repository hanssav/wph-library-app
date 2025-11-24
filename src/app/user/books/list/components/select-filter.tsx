import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { CATEGORY_FILTERS } from './filter.costants';
import type { BaseComponentProps } from '@/type';
import { cn } from '@/lib/utils';

const SelectFilter = ({ className }: Partial<BaseComponentProps>) => {
  return (
    <div className={cn('lg:hidden', className)}>
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Filter' />
        </SelectTrigger>
        <SelectContent className='w-full'>
          <SelectGroup>
            {CATEGORY_FILTERS.map((category) => (
              <SelectItem key={category.id} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFilter;
