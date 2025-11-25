import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, HandbagIcon, Menu, Search, X } from 'lucide-react';
import { userMenu } from './navbar.constants';
import { avatarImage, cn, getImage } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import ButtonUserNotLogin from './button-user-not-login';
import React from 'react';
import { Button } from '@/components/ui/button';
import { HOME_PATH, IMAGES } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

  const isLoggedIn = Boolean(token);
  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md shadow-card'>
      <div className='container-x flex justify-between items-center py-3 md:py-5 gap-4 md:gap-10'>
        <div
          className='relative overflow-hidden size-10 md:w-auto md:size-11'
          onClick={() => navigate(HOME_PATH)}
        >
          <img
            src={IMAGES.LOGO}
            alt='Logo'
            className='w-full h-full object-cover object-left'
            loading='lazy'
          />
        </div>
        <div
          className={cn(
            'relative flex-1 max-w-[500px]',
            isLoggedIn && !isSearchOpen ? 'hidden md:flex' : 'hidden',
            isSearchOpen && 'block'
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

        <div className={cn(!isSearchOpen && 'hidden')}>
          <X onClick={() => setIsSearchOpen(false)} />
        </div>

        <div
          className={cn('flex-center gap-4 md:gap-6', isSearchOpen && 'hidden')}
        >
          <Search
            className='md:hidden size-6'
            onClick={() => setIsSearchOpen(true)}
          />
          <div
            className={cn('relative flex-center', !isLoggedIn && 'md:hidden')}
          >
            <div className='absolute size-5 -right-2 md:-right-1 -translate-y-1/2  bg-accent-red rounded-full text-white text-[12px] aspect-square flex-center'>
              1
            </div>
            <HandbagIcon className='size-6 md:size-8' />
          </div>

          <div
            className={cn(
              isLoggedIn ? 'hidden' : 'hidden md:flex md:w-full',
              'gap-4'
            )}
          >
            <ButtonUserNotLogin />
          </div>

          <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
            <DropdownMenuTrigger
              asChild
              className={cn(!isLoggedIn && 'md:hidden')}
            >
              {isLoggedIn ? (
                <span className='px-0 md:flex-center md:gap-4'>
                  <Avatar className='size-10 md:size-12 cursor-pointer'>
                    <AvatarImage
                      src={getImage(avatarImage, 'avatar')}
                      alt={`@${user?.name}`}
                    />
                  </Avatar>
                  <p className='hidden md:inline text-lg-semibold'>
                    {user?.name}
                  </p>
                  <ChevronDown className='hidden md:inline size-6' />
                </span>
              ) : (
                <Button
                  variant={'ghost'}
                  className='p-0! border-0 cursor-pointer'
                >
                  {isOpenMenu ? <X /> : <Menu />}
                </Button>
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
                  <DropdownMenuLabel key={menu.id} className={menu.className}>
                    {menu.label}
                  </DropdownMenuLabel>
                ))
              ) : (
                <ButtonUserNotLogin />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
