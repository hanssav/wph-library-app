import {
  BORROWED_LIST_PATH,
  DASHBOARD_PATH,
  HOME_PATH,
  PROFILE_PATH,
  REVIEW_PATH,
} from '@/constants/base.constants';

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

export const adminMenu: MenuItem[] = [
  {
    id: 'dashboard-borrowed-list',
    type: 'link',
    label: 'Borrowed List',
    path: DASHBOARD_PATH.BORROWED_LIST,
  },
  {
    id: 'dashboard-user-list',
    type: 'link',
    label: 'User List',
    path: DASHBOARD_PATH.USER,
  },
  {
    id: 'dashboard-book-list',
    type: 'link',
    label: 'Book List',
    path: DASHBOARD_PATH.BOOK_LIST,
  },
  {
    id: 'logout',
    type: 'action',
    label: 'Logout',
    className: 'text-accent-red',
    path: HOME_PATH,
  },
];
