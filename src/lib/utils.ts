import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const coverImage =
  'https://www.huber-usa.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg';
export const avatarImage = 'https://github.com/shadcn.png';

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
