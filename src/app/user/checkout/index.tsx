import { SectionWrapper } from '@/components/container';
import { CheckoutTitle, CheckoutWrapper } from './components/checkout-item';
import { TextInfo } from '@/components/pages/profile/text-info';
import { useLoanBooks, useMe } from '@/hooks';
import { profileData } from '../profile/profile.constants';
import { CartCard, CartCardItems } from '../cart/components';
import { Hr } from '@/components/ui/hr';
import { Input } from '@/components/ui/input';
import React from 'react';
import type { BaseComponentProps } from '@/type';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BORROW_DURATIONS, BORROW_TERMS } from './components/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '@/store';
import { toast } from 'sonner';
import { TextLoading } from '@/components/pages/auth';
import { setBookLoansItems } from '@/store/slices';

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
  const dispatch = useAppDispatch();

  const loansData = useSelector((state: RootState) => state.bookLoans.datas);

  const { data: user } = useMe();
  if (!user) throw new Error('user not foud');

  const [selectedDuration, setSelectedDuration] = React.useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = React.useState<
    Record<string, boolean>
  >({});
  const [errors, setErrors] = React.useState<{
    duration?: string;
    terms?: string;
  }>({});
  const profile = user?.data.profile;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + Number(selectedDuration));

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!selectedDuration) {
      newErrors.duration = 'Please select a borrow duration';
    }

    const allTermsAccepted = BORROW_TERMS.every(
      (term) => acceptedTerms[term.id]
    );
    if (!allTermsAccepted) {
      newErrors.terms = 'Please accept all terms and conditions';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTermChange = (termId: string, checked: boolean) => {
    setAcceptedTerms((prev) => ({
      ...prev,
      [termId]: checked,
    }));
    if (errors.terms) {
      setErrors((prev) => ({ ...prev, terms: undefined }));
    }
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    if (errors.duration) {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const { mutate, isPending } = useLoanBooks();

  const onCheckout = () => {
    if (!validateForm()) {
      toast.error('Please complete all required fields');
      return;
    }

    if (loansData.length === 0) {
      toast.error('Keranjang pinjaman kosong');
      return;
    }

    const days = Number(selectedDuration);
    if (!selectedDuration || isNaN(days) || days <= 0) {
      toast.error('Pilih durasi pinjaman');
      return;
    }

    const requests = loansData.map((item) => ({
      bookId: item.bookId || item.id,
      qty: item.qty,
    }));

    const cartItemIds = loansData
      .map((item) => item.id)
      .filter((id): id is number => typeof id === 'number');

    dispatch(
      setBookLoansItems({
        datas: loansData,
        duration: Number(selectedDuration),
      })
    );
    mutate({ requests, cartItemIds });
  };

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
                {loansData.map((cart) => (
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
                  value={formatDate(dueDate)}
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
                      <Label htmlFor={duration.id}>{duration.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.duration && (
                  <p className='text-sm text-red-500 mt-1'>{errors.duration}</p>
                )}
              </ContentWrapper>

              <ContentWrapper
                className='p-3 rounded-[12px] bg-[#F6F9FE]'
                title='Return Date'
              >
                <p className='text-sm-medium lg:text-md-medium'>
                  Please return the book no later than
                  <span className='text-[#EE1D52] text-md-bold'>
                    {' '}
                    {formatDate(new Date())}
                  </span>
                </p>
              </ContentWrapper>

              <div className='space-y-2'>
                {BORROW_TERMS.map((terms) => (
                  <div key={terms.id} className='flex gap-4'>
                    <Checkbox
                      checked={acceptedTerms[terms.id] || false}
                      onCheckedChange={(checked) =>
                        handleTermChange(terms.id, checked as boolean)
                      }
                    />
                    <label className='cursor-pointer' htmlFor={terms.id}>
                      {terms.label}
                    </label>
                  </div>
                ))}
                {errors.terms && (
                  <p className='text-sm text-red-500 mt-1'>{errors.terms}</p>
                )}
              </div>

              <Button
                onClick={onCheckout}
                disabled={isPending || loansData.length === 0}
                widthFull
              >
                {isPending ? (
                  <TextLoading>Loading ... </TextLoading>
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
