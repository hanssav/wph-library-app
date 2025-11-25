import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CloseSearchButtonProps {
  isSearchOpen: boolean;
  onClick: () => void;
}

export const CloseSearchButton: React.FC<CloseSearchButtonProps> = ({
  isSearchOpen,
  onClick,
}) => (
  <div className={cn(!isSearchOpen && 'hidden')}>
    <X onClick={onClick} />
  </div>
);
