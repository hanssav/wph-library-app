import { cn } from '@/lib/utils';
import { UserNotLoginButton } from './nav-user-not-login-button';

interface DesktopLoginButtonsProps {
  isLoggedIn: boolean;
}

export const DesktopLoginButtons: React.FC<DesktopLoginButtonsProps> = ({
  isLoggedIn,
}) => (
  <div
    className={cn(isLoggedIn ? 'hidden' : 'hidden md:flex md:w-full', 'gap-4')}
  >
    <UserNotLoginButton />
  </div>
);
