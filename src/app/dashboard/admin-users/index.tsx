import { useUsersInfinite } from '@/hooks/use-admin';

const AdminUsers = () => {
  const { data } = useUsersInfinite();

  const users = data?.pages.flatMap((res) => res.data.users);

  console.log(users, 'data');
  return <div>AdminUsers</div>;
};

export default AdminUsers;
