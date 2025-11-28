import { IMAGES } from '@/constants/base.constants';

export type HeroSlidesType = { id: number; src: string; alt: string };

const { HERO, CATEGORY } = IMAGES;

export const heroSlides: HeroSlidesType[] = [
  { id: 1, src: HERO, alt: 'Hero 1' },
  { id: 2, src: HERO, alt: 'Hero 2' },
  { id: 3, src: HERO, alt: 'Hero 3' },
];

export type CategoryItem = {
  id: string;
  icon: string;
  label: string;
};

export const CATEGORY_LIST: CategoryItem[] = [
  { id: 'fiction', icon: CATEGORY.FIKSI, label: 'Fiction' },
  { id: 'non-fiction', icon: CATEGORY.NON_FICTION, label: 'Non-Fiction' },
  {
    id: 'self-improvement',
    icon: CATEGORY.SELF_IMPROVEMENT,
    label: 'Self-Improvement',
  },
  { id: 'finance', icon: CATEGORY.FINANCE_BUSINESS, label: 'Finance' },
  { id: 'science', icon: CATEGORY.SCIENCE_TECHNOLOGY, label: 'Science' },
  { id: 'education', icon: CATEGORY.EDUCATION, label: 'Education' },
];
