import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';
import { ArrowLeft } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleSection = ({
  children,
  className,
  ...props
}: BaseComponentProps & ComponentProps<'div'>) => {
  const navigate = useNavigate();
  return (
    <div className='flex-center gap-3' {...props} onClick={() => navigate(-1)}>
      <ArrowLeft />
      <h1 className={cn('text-xl-bold lg:text-display-xs-bold', className)}>
        {children}
      </h1>
    </div>
  );
};

export { TitleSection };
