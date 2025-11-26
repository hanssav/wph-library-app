import { SectionWrapper } from '@/components/container';
import { CheckoutTitle, CheckoutWrapper } from './components /checkout-item';
import { TextInfo } from '@/components/pages/profile/text-info';
import { useCart, useMe } from '@/hooks';
import { profileData } from '../profile/profile.constants';
import { CartCard, CartCardItems } from '../cart/components';
import { Hr } from '@/components/ui/hr';
import { Input } from '@/components/ui/input';
import React from 'react';
import type { BaseComponentProps } from '@/type';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BORROW_DURATIONS, BORROW_TERMS } from './components /constants';
import { Checkbox } from '@/components/ui/checkbox';

const ContentWrapper = ({
  title,
  className,
  children,
}: { title: string } & BaseComponentProps) => (
  <div className={cn('space-y-3', className)}>
    <h2 className='text-sm-bold md:text-md-bold'>{title}</h2>
    {children}
  </div>
);

const Checkout = () => {
  const [borowDate] = React.useState<string>('22 Augst 2025');
  const { data } = useMe();
  const { data: cartData } = useCart();
  const carts = cartData?.items ?? [];

  if (!data) return null;
  const { profile } = data.data;

  return (
    <div className='base-container'>
      <SectionWrapper title='Checkout'>
        <div className='flex flex-wrap overflow-hidden gap-6 lg:gap-[58px] '>
          <div className='flex-1 basis-80 space-y-4 md:space-y-8'>
            <CheckoutWrapper title='User Information'>
              {profileData(profile).map((profile) => (
                <TextInfo {...profile} key={profile.value} />
              ))}
            </CheckoutWrapper>
            <Hr />
            <CheckoutWrapper title='Book List'>
              <CartCard className='flex-1 min-w-0'>
                {carts.map((cart) => (
                  <CartCardItems cart={cart} key={cart.id} />
                ))}
              </CartCard>
            </CheckoutWrapper>
          </div>
          <div className='flex-1 basis-80'>
            <CheckoutWrapper className='space-y-5'>
              <CheckoutTitle sizeLg>Complete Your Borrow Request</CheckoutTitle>
              <ContentWrapper title='Borrow Date' className='space-y-0.5'>
                <Input
                  className='rounded-xl disabled:bg-neutral-200'
                  disabled
                  value={borowDate}
                />
              </ContentWrapper>
              <ContentWrapper title='Borrow Duration'>
                <RadioGroup defaultValue='option-one'>
                  {BORROW_DURATIONS.map((duration) => (
                    <div
                      key={duration.id}
                      className='flex items-center space-x-2'
                    >
                      <RadioGroupItem value={duration.id} id={duration.id} />
                      <Label htmlFor={duration.id}>{duration.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </ContentWrapper>
              <ContentWrapper
                className='p-3 rounded-[12px] bg-[#F6F9FE]'
                title='Return Date'
              >
                <p className='text-sm-medium lg:text-md-medium'>
                  Please return the book no later than
                  <span className='text-[#EE1D52] text-md-bold'>
                    {' '}
                    31 August 2025
                  </span>
                </p>
              </ContentWrapper>

              <div className='space-y-2'>
                {BORROW_TERMS.map((terms) => (
                  <div key={terms.id} className='flex gap-4'>
                    <Checkbox></Checkbox>
                    <label>{terms.label}</label>
                  </div>
                ))}
              </div>
              <Button widthFull>Confirm & Borrow</Button>
            </CheckoutWrapper>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Checkout;
