import { IMAGES } from '@/constants/base.constants';

interface LogoProps {
  onClick: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div
    className='relative overflow-hidden size-10 md:h-11 md:w-full md:max-w-40 '
    onClick={onClick}
  >
    <img
      src={IMAGES.LOGO}
      alt='Logo'
      className='w-full h-full object-cover object-left'
      loading='lazy'
    />
  </div>
);
