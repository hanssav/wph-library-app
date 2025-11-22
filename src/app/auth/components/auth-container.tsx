import React from 'react';
import logo from '@/assets/logo.svg';
import type { BaseComponentProps } from '@/type';
import type { AuthSectionProps } from '../type';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type AuthContainerProps = Omit<AuthSectionProps, 'footer'> & BaseComponentProps;

const AuthContainer: React.FC<AuthContainerProps> = ({
  title,
  desc,
  children,
}) => {
  return (
    <div className='w-full md:max-w-[27.78vw] space-y-5'>
      <div>
        <img src={logo} alt='Logo' width={122} />
      </div>
      <div className='space-y-0.5'>
        <h1 className='text-display-xs-bold md:text-display-sm-bold'>
          {title}
        </h1>
        <p className='text-sm-semibold md:text-md-semibold'>{desc}</p>
      </div>

      {children}
    </div>
  );
};

const AuthContainerButtonFooter: React.FC<{
  footer: AuthSectionProps['footer'];
}> = ({ footer }) => {
  const navigate = useNavigate();
  return (
    <p className='text-center text-sm-bold md:text-md-bold'>
      {footer.question}
      <Button
        onClick={() => navigate(footer.href)}
        size={'link'}
        variant={'link'}
      >
        {footer.label}
      </Button>
    </p>
  );
};

export { AuthContainer, AuthContainerButtonFooter };
