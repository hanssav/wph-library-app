import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { type ComponentProps } from 'react';
import type { BaseComponentProps } from '@/type';
import { Input } from '../ui/input';

type SearchInputWrapperProps = { iconSize?: number } & BaseComponentProps &
  ComponentProps<'div'>;

const SearchInputWrapper = ({
  className,
  children,
  iconSize = 15,
  ...props
}: SearchInputWrapperProps) => {
  return (
    <div className={cn('relative', className)} {...props}>
      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 '>
        <Search size={iconSize} />
      </span>
      {children}
    </div>
  );
};

type SearchInputProps = { className?: string } & ComponentProps<'input'>;

const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <Input
      name='search'
      className={cn('rounded-full h-10 md:h-11 pl-10', className)}
      {...props}
    />
  );
};

export { SearchInputWrapper, SearchInput };
