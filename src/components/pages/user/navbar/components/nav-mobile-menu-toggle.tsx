import { X, Menu } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpenMenu: boolean;
  onClick?: () => void;
}
export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpenMenu,
}) => (
  <span className='inline-flex items-center justify-center cursor-pointer'>
    {isOpenMenu ? <X className='size-6' /> : <Menu className='size-6' />}
  </span>
);
