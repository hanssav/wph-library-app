import { useMemo } from 'react';

export const useDueDate = (selectedDuration: string) => {
  return useMemo(() => {
    if (!selectedDuration) return null;
    const date = new Date();
    date.setDate(date.getDate() + Number(selectedDuration));
    return date;
  }, [selectedDuration]);
};
