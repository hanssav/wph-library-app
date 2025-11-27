import type { TextInfoProps } from '@/app/user/profile/profile.constants';
import { TextInfo } from '@/components/pages/profile/text-info';
import { Card } from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import type { BaseComponentProps, User } from '@/type';

const AdminUserCards = ({ children, className }: BaseComponentProps) => {
  return <div className={cn('space-y-4', className)}>{children}</div>;
};

export const profileData = (profile: User, no: number): TextInfoProps[] => [
  {
    label: 'no',
    value: no ? String(no) : '-',
  },
  {
    label: 'Name',
    value: profile.name,
  },
  {
    label: 'Email',
    value: profile.email,
  },
  {
    label: 'Nomor Handphone',
    value: profile.phoneNumber ?? '-',
  },
  {
    label: 'Role',
    value: profile.role,
  },
  {
    label: 'Created at',
    value: formatDate(profile.createdAt, 'DD MMM YYYY, HH:mm'),
  },
];

type AdminUserItem = { data: User; idx: number };

const AdminUsersItem = ({ data, idx }: AdminUserItem) => {
  return (
    <Card>
      {profileData(data, idx).map((profile) => (
        <TextInfo {...profile} key={profile.value} />
      ))}
    </Card>
  );
};

export { AdminUserCards, AdminUsersItem };
