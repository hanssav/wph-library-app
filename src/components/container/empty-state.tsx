import type { EmptyStateType } from '@/constants';

export type EmptyStateProps = {
  data: EmptyStateType;
};
export const EmptyState = ({ data }: EmptyStateProps) => {
  const { icon, title, subtitle } = data;
  const Icon = icon;

  return (
    <div className='flex flex-col flex-1 items-center justify-center py-12 text-center'>
      <div className='relative mb-6'>
        <div className='absolute inset-0 rounded-full bg-[#1C65DA] blur-xl opacity-20' />
        <div className='relative flex h-24 w-24 items-center justify-center rounded-full bg-[#1C65DA] bg-opacity-10'>
          <Icon className='h-12 w-12 text-white' />
        </div>
      </div>

      <p className='text-lg-bold text-neutral-700'>{title}</p>

      {subtitle && (
        <p className='text-sm-medium text-neutral-500 mt-2'>{subtitle}</p>
      )}
    </div>
  );
};
