import { TabMenu } from '@/components/container';
import { Outlet } from 'react-router-dom';

const tabConfig = [
  { value: 'borrowed-list', label: 'Borrowed List' },
  { value: 'users', label: 'User' },
  { value: 'book-list', label: 'Book List' },
];

export default function LayoutDashboardTabMenu() {
  return (
    <div className='base-container'>
      <TabMenu tabConfig={tabConfig} basePath='/dashboard'>
        <Outlet />
      </TabMenu>
    </div>
  );
}
