import logo from '@/assets/logo.svg';
import hero from '@/assets/hero.png';
import education from '@/assets/icons/education.svg';
import fiksi from '@/assets/icons/fiksi.svg';
import financeBusiness from '@/assets/icons/finance-business.svg';
import nonFiction from '@/assets/icons/non-fiction.svg';
import scienceTechnology from '@/assets/icons/science-technology.svg';
import selfImprovement from '@/assets/icons/self-improvement.svg';

export const IMAGES = {
  LOGO: logo,
  HERO: hero,

  CATEGORY: {
    EDUCATION: education,
    FIKSI: fiksi,
    FINANCE_BUSINESS: financeBusiness,
    NON_FICTION: nonFiction,
    SCIENCE_TECHNOLOGY: scienceTechnology,
    SELF_IMPROVEMENT: selfImprovement,
  },
};

export const BOOK_PATH = {
  INDEX: '/books',
};

export const AUTH_PATH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const AUTHOR_PATH = {
  INDEX: '/author',
};

export const HOME_PATH = '/';
