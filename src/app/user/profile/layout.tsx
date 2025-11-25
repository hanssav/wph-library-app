import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const tabConfig = [
  { value: '', label: 'Profile' },
  { value: 'borrowed-list', label: 'Borrowed List' },
  { value: 'reviews', label: 'Reviews' },
];

export default function ProfileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/profile')[1] || '';
  const currentTab = pathParts.replace(/^\//, '') || '';

  const handleTabChange = (value: string) => {
    navigate(value ? `/profile/${value}` : '/profile');
  };

  useEffect(() => {
    const isValid = tabConfig.some((tab) => tab.value === currentTab);
    if (!isValid && currentTab !== '') {
      navigate('/profile', { replace: true });
    }
  }, [currentTab, navigate]);

  return (
    <div className='base-container'>
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='w-full md:w-[60vw] lg:w-[39vw] flex-between h-14 gap-2 px-3 py-2 '>
          {tabConfig.map(({ value, label }) => (
            <TabsTrigger key={value || 'root'} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentTab} className='mt-5'>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
