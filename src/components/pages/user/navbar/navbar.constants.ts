type MenuItem = {
  id: string;
  type: string;
  label: string;
  className?: string;
};

export const userMenu: MenuItem[] = [
  {
    id: 'profile',
    type: 'link',
    label: 'Profile',
  },
  {
    id: 'borrowed-list',
    type: 'link',
    label: 'Borrowed List',
  },
  {
    id: 'reviews',
    type: 'link',
    label: 'Reviews',
  },
  {
    id: 'logout',
    type: 'action',
    label: 'Logout',
    className: 'text-accent-red',
  },
];
