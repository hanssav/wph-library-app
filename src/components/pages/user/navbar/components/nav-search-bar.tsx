import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchBarProps {
  isLoggedIn: boolean;
  isSearchOpen: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isLoggedIn,
  isSearchOpen,
  className,
}) => (
  <div
    className={cn(
      'relative flex-1 max-w-[500px]',
      isLoggedIn && !isSearchOpen ? 'hidden md:flex' : 'hidden',
      isSearchOpen && 'block',
      className
    )}
  >
    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 '>
      <Search size={15} />
    </span>
    <Input
      name='search'
      className='rounded-full h-10 md:h-11 pl-10'
      placeholder='Search book'
    ></Input>
  </div>
);
