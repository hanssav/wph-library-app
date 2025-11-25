import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpenMenu: boolean;
  onClick?: () => void;
}
export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpenMenu,
}) => (
  <Button variant='ghost' size='icon' className='md:hidden'>
    {isOpenMenu ? <X className='size-6' /> : <Menu className='size-6' />}
  </Button>
);
