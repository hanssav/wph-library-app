import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search } from 'lucide-react';
import { userMenu } from './navbar.constants';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { HOME_PATH, PROFILE_PATH } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks';
import { Logo } from './components/nav-logo';
import { SearchBar } from './components/nav-search-bar';
import { CloseSearchButton } from './components/nav-close-search';
import { ShoppingCart } from './components/nav-shopping-cart';
import { DesktopLoginButtons } from './components/nav-desktop-login';
import { UserAvatarTrigger } from './components/nav-user-avatar-trigger';
import { MobileMenuToggle } from './components/nav-mobile-menu-toggle';
import { UserNotLoginButton } from './components/nav-user-not-login-button';

const UserNavbar = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

  const isLoggedIn = Boolean(token);

  const logout = useLogout();

  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md shadow-card'>
      <div className='container-x flex justify-between items-center py-3 md:py-5 gap-4 md:gap-10'>
        <Logo onClick={() => navigate(HOME_PATH)} />
        {/* Search */}
        <SearchBar isLoggedIn={isLoggedIn} isSearchOpen={isSearchOpen} />
        <CloseSearchButton
          isSearchOpen={isSearchOpen}
          onClick={() => setIsSearchOpen(false)}
        />

        {/* Right Section */}
        <div
          className={cn('flex-center gap-4 md:gap-6', isSearchOpen && 'hidden')}
        >
          <Search
            className='md:hidden size-6'
            onClick={() => setIsSearchOpen(true)}
          />
          <ShoppingCart isLoggedIn={isLoggedIn} />
          <DesktopLoginButtons isLoggedIn={isLoggedIn} />
          <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
            <DropdownMenuTrigger className={cn(!isLoggedIn && 'md:hidden')}>
              {isLoggedIn ? (
                <UserAvatarTrigger userName={user?.name} />
              ) : (
                <MobileMenuToggle isOpenMenu={isOpenMenu} />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={cn(
                'w-screen max-w-[calc(100vw-2.5rem)] md:max-w-[184px]',
                !isLoggedIn && 'flex gap-4 p-4 shadow-none!'
              )}
              align='end'
              sideOffset={10}
            >
              {isLoggedIn ? (
                userMenu.map((menu) => (
                  <DropdownMenuLabel
                    onClick={() => {
                      if (menu.id === 'logout') logout();

                      const path = menu.path === PROFILE_PATH ? '' : menu.path;
                      navigate(`${PROFILE_PATH}${path}`);
                      setIsOpenMenu(false);
                    }}
                    key={menu.id}
                    className={menu.className}
                  >
                    {menu.label}
                  </DropdownMenuLabel>
                ))
              ) : (
                <UserNotLoginButton />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
