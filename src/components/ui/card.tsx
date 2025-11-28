import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { BaseComponentProps } from '@/type';
import { Star } from 'lucide-react';

const CardContext = React.createContext<{
  variant: VariantProps<typeof cardVariants>['variant'];
}>({
  variant: 'default',
});

export const useCard = () => React.useContext(CardContext);

export const cardVariants = cva('flex flex-col rounded-xl w-full shadow-card', {
  variants: {
    variant: {
      default: 'bg-white gap-4 p-4',
      category: 'gap-3 p-3 lg:gap-4 lg:p-4',
      book: 'rounded-[12px] cursor-pointer',
      author: 'gap-3 p-3 rounded-[12px] flex-row cursor-pointer',
      review: 'p-3 lg:gap-5 gap-4',
      base: 'bg-white border border-neutral-300 rounded-[12px] py-4 space-y-4 shadow-none!',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface CardProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div
        data-slot='card'
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    </CardContext.Provider>
  );
}

interface CardImageWrapperProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    BaseComponentProps {}

function CardImageWrapper({
  className,
  children,
  ...props
}: CardImageWrapperProps) {
  const { variant } = useCard();
  return (
    <div
      className={cn(
        'flex-center',
        variant == 'category' && 'bg-[#E0ECFF] rounded-[10.5px] p-1.5',
        variant == 'book' && 'p-0 m-0',
        className
      )}
      {...props}
      data-slot='card-image-wrapper'
    >
      {children}
    </div>
  );
}

interface CardImageProps extends React.ComponentProps<'img'> {}

function CardImage({ ...props }: CardImageProps) {
  const { variant } = useCard();

  return (
    <img
      data-slot='card-image'
      loading='lazy'
      className={cn(
        'w-full h-full object-cover',
        variant == 'category' && 'aspect-square size-[45px] lg:size-[52px]',
        variant == 'book' && 'w-full aspect-2/3 object-cover'
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  const { variant } = useCard();

  return (
    <div
      data-slot='card-title'
      className={cn(
        // 'leading-none',
        variant === 'category' &&
          'text-xs-semibold lg:text-md-semibold leading-tight wrap-break-word',
        variant === 'book' &&
          'text-sm-bold lg:text-lg-bold wrap-break-words leading-tight line-clamp-2',
        variant === 'author' && 'text-md-bold lg:text-lg-bold lg:line-clamp-1',
        variant === 'review' && 'text-sm-bold md:text-lg-bold',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  const { variant } = useCard();
  return (
    <div
      data-slot='card-description'
      className={cn(
        'text-muted-foreground text-sm',
        variant === 'book' &&
          'text-sm-medium lg:text-md-semibold text-neutral-700',
        variant === 'author' &&
          'text-sm-medium lg:text-md-medium text-[#0A0D12] line-clamp-1',
        variant === 'review' && 'text-sm-medium md:text-md-medium',
        className
      )}
      {...props}
    />
  );
}

function CardRating({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-0.5 items-center', className)} {...props}>
      <Star className='fill-[#FFAB0D] stroke-[#FFAB0D] size-4' />
      <span className='text-sm-semibold lg:text-md-semibold'>{children}</span>
    </div>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { variant } = useCard();

  return (
    <div
      data-slot='card-content'
      className={cn(
        variant == 'book' && 'p-3 space-y-0.5 lg:p-4 lg:space-y-1',
        variant === 'author' && 'space-y-0.5',
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardRating,
  // CardHeader,
  CardImage,
  CardImageWrapper,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
