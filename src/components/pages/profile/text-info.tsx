import type { TextInfoProps } from '@/app/user/profile/profile.constants';

export const TextInfo = ({ label, value }: TextInfoProps) => (
  <div className='flex-between'>
    <p className='text-sm-medium lg:text-md-medium text-[#0A0D12]'>{label}</p>
    <h2 className='text-sm-bold lg:text-md-bold'>{value}</h2>
  </div>
);
