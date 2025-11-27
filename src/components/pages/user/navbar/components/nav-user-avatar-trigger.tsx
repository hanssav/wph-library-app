import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { avatarImage } from '@/constants';
import { getImage } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface UserAvatarTriggerProps {
  userName?: string;
  onClick?: () => void;
}

export const UserAvatarTrigger: React.FC<UserAvatarTriggerProps> = ({
  userName,
  onClick,
}) => (
  <span
    className='px-0 md:flex-center md:gap-4 cursor-pointer'
    onClick={onClick}
  >
    <Avatar className='size-10 md:size-12 cursor-pointer'>
      <AvatarImage src={getImage(avatarImage, 'avatar')} alt={`@${userName}`} />
    </Avatar>
    <p className='hidden md:inline text-lg-semibold'>{userName}</p>
    <ChevronDown className='hidden md:inline size-6' />
  </span>
);
