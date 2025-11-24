import {
  BORROWED_LIST_PATH,
  HOME_PATH,
  PROFILE_PATH,
  REVIEW_PATH,
} from '@/lib/constants';

type MenuItem = {
  id: string;
  type: string;
  label: string;
  className?: string;
  path: string;
};

export const userMenu: MenuItem[] = [
  {
    id: 'profile',
    type: 'link',
    label: 'Profile',
    path: PROFILE_PATH,
  },
  {
    id: 'borrowed-list',
    type: 'link',
    label: 'Borrowed List',
    path: BORROWED_LIST_PATH,
  },
  {
    id: 'reviews',
    type: 'link',
    label: 'Reviews',
    path: REVIEW_PATH,
  },
  {
    id: 'logout',
    type: 'action',
    label: 'Logout',
    className: 'text-accent-red',
    path: HOME_PATH,
  },
];
