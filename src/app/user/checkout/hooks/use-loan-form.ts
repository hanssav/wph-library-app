import React from 'react';
import { BORROW_TERMS } from '../components';

export const useBorrowForm = () => {
  const [selectedDuration, setSelectedDuration] = React.useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = React.useState<
    Record<string, boolean>
  >({});
  const [errors, setErrors] = React.useState<{
    duration?: string;
    terms?: string;
  }>({});

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
    setAcceptedTerms((prev) => ({ ...prev, [termId]: checked }));
    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    if (errors.duration)
      setErrors((prev) => ({ ...prev, duration: undefined }));
  };

  return {
    selectedDuration,
    setSelectedDuration,
    acceptedTerms,
    errors,
    validateForm,
    handleTermChange,
    handleDurationChange,
  };
};
