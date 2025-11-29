import { SectionWrapper } from '@/components/container';
import { CheckoutTitle, CheckoutWrapper } from './components/checkout-item';
import { TextInfo } from '@/components/pages/profile/text-info';
import { profileData } from '../profile/profile.constants';
import { CartCard, CartCardItems } from '../cart/components';
import { Hr } from '@/components/ui/hr';
import { Input } from '@/components/ui/input';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BORROW_DURATIONS, BORROW_TERMS } from './components/constants';
import { toast } from 'sonner';
import { TextLoading } from '@/components/pages/auth';

import { useBorrowCheckout } from './hooks/use-borrow-checkout';
import { useBorrowData } from './hooks/use-borrow-data';
import { useDueDate } from './hooks/use-due-date';
import { useBorrowForm } from './hooks/use-loan-form';

const ContentWrapper = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn('space-y-3', className)}>
    <h2 className='text-sm-bold md:text-md-bold'>{title}</h2>
    {children}
  </div>
);

const Checkout = () => {
  const { profile, loansData } = useBorrowData();

  const {
    selectedDuration,
    acceptedTerms,
    errors,
    validateForm,
    handleDurationChange,
    handleTermChange,
  } = useBorrowForm();

  const dueDate = useDueDate(selectedDuration);
  const { onCheckout, isPending } = useBorrowCheckout(loansData);

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please complete all required fields');
      return;
    }
    onCheckout(selectedDuration);
  };

  return (
    <div className='base-container'>
      <SectionWrapper title='Checkout'>
        <div className='flex flex-wrap gap-6 lg:gap-[58px]'>
          <div className='flex-1 basis-80 space-y-4 md:space-y-8'>
            <CheckoutWrapper title='User Information'>
              {profileData(profile).map((item) => (
                <TextInfo {...item} key={item.label} />
              ))}
            </CheckoutWrapper>
            <Hr />
            <CheckoutWrapper title='Book List'>
              <CartCard className='flex-1 min-w-0'>
                {loansData.map((cart) => (
                  <CartCardItems cart={cart} key={cart.id} />
                ))}
              </CartCard>
            </CheckoutWrapper>
          </div>
          <div className='flex-1 basis-80'>
            <CheckoutWrapper className='space-y-6'>
              <CheckoutTitle sizeLg>Complete Your Borrow Request</CheckoutTitle>

              <ContentWrapper title='Borrow Date'>
                <Input
                  className='rounded-xl disabled:bg-neutral-200'
                  disabled
                  value={formatDate(new Date())}
                />
              </ContentWrapper>

              <ContentWrapper title='Borrow Duration'>
                <RadioGroup
                  value={selectedDuration}
                  onValueChange={handleDurationChange}
                >
                  {BORROW_DURATIONS.map((duration) => (
                    <div
                      key={duration.id}
                      className='flex items-center space-x-2'
                    >
                      <RadioGroupItem
                        value={String(duration.value)}
                        id={duration.id}
                      />
                      <Label htmlFor={duration.id} className='cursor-pointer'>
                        {duration.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.duration && (
                  <p className='text-sm text-red-500 mt-1'>{errors.duration}</p>
                )}
              </ContentWrapper>

              <ContentWrapper
                title='Return Date'
                className='p-4 rounded-[12px] bg-[#F6F9FE]'
              >
                <p className='text-sm-medium lg:text-md-medium'>
                  Please return the book no later than{' '}
                  <span className='text-[#EE1D52] text-md-bold'>
                    {dueDate ? formatDate(dueDate) : '-'}
                  </span>
                </p>
              </ContentWrapper>

              <div className='space-y-3'>
                {BORROW_TERMS.map((term) => (
                  <div key={term.id} className='flex items-start gap-3'>
                    <Checkbox
                      checked={!!acceptedTerms[term.id]}
                      onCheckedChange={(checked) =>
                        handleTermChange(term.id, checked === true)
                      }
                      id={term.id}
                    />
                    <Label htmlFor={term.id} className='cursor-pointer text-sm'>
                      {term.label}
                    </Label>
                  </div>
                ))}
                {errors.terms && (
                  <p className='text-sm text-red-500'>{errors.terms}</p>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isPending || loansData.length === 0}
                widthFull
                className='text-lg'
              >
                {isPending ? (
                  <TextLoading>Loading...</TextLoading>
                ) : (
                  'Confirm & Borrow'
                )}
              </Button>
            </CheckoutWrapper>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Checkout;
