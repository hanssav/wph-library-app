import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/constants';
import { Dribbble, Facebook, Instagram, Linkedin } from 'lucide-react';

const footerSection = {
  logo: IMAGES.LOGO,
  desc: 'Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.',

  social: {
    title: 'Follow on Social Media',
    data: [
      {
        id: 'facebook',
        icon: Facebook,
        name: 'Facebook',
      },
      {
        id: 'instagram',
        icon: Instagram,
        name: 'Instagram',
      },
      {
        id: 'linkedin',
        icon: Linkedin,
        name: 'LinkedIn',
      },
      {
        id: 'dribble',
        icon: Dribbble,
        name: 'Dribble',
      },
    ],
  },
};

const UserFooter = () => {
  const { desc, logo, social } = footerSection;
  return (
    <footer className='shadow-card'>
      <div className='base-container py-10 flex-col-center gap-4 md:gap-8 lg:gap-10'>
        <div className='flex flex-col gap-4 lg:gap-5 text-center'>
          <img
            src={logo}
            alt='Logo'
            className='w-auto max-h-[42px] md:w-auto md:size-11'
            loading='lazy'
          />
          <p className='text-sm-semibold t'>{desc}</p>
        </div>
        <div className='flex-col-center lg:gap-5 gap-4'>
          <h1 className='text-md-bold'>{social.title}</h1>
          <div className='flex gap-3'>
            {social.data.map((data) => {
              const Icon = data.icon;
              return (
                <Button variant={'outline'} size={'icon-lg'} key={data.id}>
                  <Icon />
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
