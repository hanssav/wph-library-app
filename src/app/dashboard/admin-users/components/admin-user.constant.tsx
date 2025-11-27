import { formatDate } from '@/lib/utils';
import type { User } from '@/type';

export type TableColumn<T> = {
  id: string;
  label: string;
  render: (data: T, rowIndex: number) => React.ReactNode;
};

export const userColumns = [
  {
    id: 'no',
    label: 'No',
    render: (_, index: number) => (
      <span className='text-muted-foreground'>{index}</span>
    ),
  },
  {
    id: 'name',
    label: 'Name',
    render: (user: User) => <span className='font-medium'>{user.name}</span>,
  },
  {
    id: 'phoneNumber',
    label: 'Nomor Handphone',
    render: (user: User) => (
      <span
        className={
          user.phoneNumber ? 'text-foreground' : 'text-muted-foreground'
        }
      >
        {user.phoneNumber || '—'}
      </span>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    render: (user: User) => <span className='text-sm'>{user.email}</span>,
  },
  {
    id: 'createdAt',
    label: 'Created at',
    render: (user: User) => (
      <div className='text-sm text-muted-foreground whitespace-nowrap'>
        {formatDate(user.createdAt, 'DD MMM YYYY, HH:mm')}
      </div>
    ),
  },
] satisfies TableColumn<User>[];
