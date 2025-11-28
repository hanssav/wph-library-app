import { coverImage, avatarImage } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// default return ex 28 aug 2026
export const formatDate = (
  date: Date | string,
  format: string = 'D MMM YYYY'
) => dayjs(date).format(format);

export const getImage = (
  url: string | null,
  variant: 'cover' | 'avatar' = 'cover'
) => {
  const img = variant === 'cover' ? coverImage : avatarImage;

  if (!url) return img;
  try {
    new URL(url);
    return url;
  } catch {
    return img;
  }
};
