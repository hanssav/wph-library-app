import type { BaseComponentProps } from '@/type';
import React from 'react';

const TextLoading: React.FC<BaseComponentProps> = ({ children }) => {
  return (
    <div className='flex items-center gap-2'>
      <span className='animate-spin h-4 w-4 border-2 border-t-transparent rounded-full' />
      {children}
    </div>
  );
};

export default TextLoading;
