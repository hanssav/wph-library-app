export type CategoryFilter = {
  id: string;
  label: string;
  value: string;
};

export const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: 'fiction',
    label: 'Fiction',
    value: 'fiction',
  },
  {
    id: 'non-fiction',
    label: 'Non-fiction',
    value: 'non-fiction',
  },
  {
    id: 'self-improve',
    label: 'Self-Improvement',
    value: 'self-improve',
  },
  {
    id: 'finance',
    label: 'Finance',
    value: 'finance',
  },
  {
    id: 'science',
    label: 'Science',
    value: 'science',
  },
  {
    id: 'education',
    label: 'Education',
    value: 'education',
  },
] as const;
