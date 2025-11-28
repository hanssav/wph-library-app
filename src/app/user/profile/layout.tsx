import { TabMenu } from '@/components/container';
import { Outlet } from 'react-router-dom';

const tabConfig = [
  { value: '', label: 'Profile' },
  { value: 'borrowed-list', label: 'Borrowed List' },
  { value: 'reviews', label: 'Reviews' },
];

export default function ProfileLayout() {
  return (
    <div className='base-container'>
      <TabMenu tabConfig={tabConfig} basePath='/profile'>
        <Outlet />
      </TabMenu>
    </div>
  );
}
