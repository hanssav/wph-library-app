import { IMAGES } from '@/constants/base.constants';

interface LogoProps {
  onClick: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div
    className='relative overflow-hidden size-10 md:w-auto md:size-11'
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
