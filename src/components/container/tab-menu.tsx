import type { BaseComponentProps } from '@/type';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type TabMenuProps = {
  tabConfig: { value: string; label: string }[];
  basePath: string;
} & BaseComponentProps;

export const TabMenu = ({
  children,
  className,
  tabConfig,
  basePath,
}: TabMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split(basePath)[1] || '';
  const currentTab = pathParts.replace(/^\//, '') || '';

  const handleTabChange = (value: string) => {
    navigate(value ? `${basePath}/${value}` : basePath);
  };

  useEffect(() => {
    const isValid = tabConfig.some((tab) => tab.value === currentTab);
    if (!isValid && currentTab !== '') {
      navigate(basePath, { replace: true });
    }
  }, [currentTab, navigate]);

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className={cn('w-full', className)}
    >
      <TabsList className='w-full md:w-[60vw] lg:w-[39vw] flex-between h-14 gap-2 px-3 py-2 '>
        {tabConfig.map(({ value, label }) => (
          <TabsTrigger key={value || 'root'} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={currentTab} className='mt-5'>
        {children}
      </TabsContent>
    </Tabs>
  );
};
