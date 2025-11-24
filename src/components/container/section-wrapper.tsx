import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';

type SectionWrapperProps = {
  title?: string;
  subTitle?: React.ReactNode;
} & BaseComponentProps;

const SectionWrapper = ({
  children,
  className,
  title,
  subTitle,
}: SectionWrapperProps) => {
  return (
    <section
      className={cn(
        'w-full',
        'flex flex-col gap-5 md:gap-8 lg:gap-10',
        className
      )}
    >
      <div className='space-y-1 md:space-y-2 lg:space-y-3'>
        {title && (
          <h1 className='text-display-xs-bold lg:text-display-lg-bold'>
            {title}
          </h1>
        )}

        {subTitle && (
          <span className='text-md-bold md:text-xl-bold'>{subTitle}</span>
        )}
      </div>
      <div className='w-full space-y-5 lg:space-y-10'>{children}</div>
    </section>
  );
};

export default SectionWrapper;
