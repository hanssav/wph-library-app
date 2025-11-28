import type { FormFieldType } from '@/type';
import type { AuthSectionProps } from './type';
import { AUTH_PATH } from '@/constants/base.constants';

export const loginFields: FormFieldType[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'Password',
    type: 'password',
  },
];

export const loginSection: AuthSectionProps = {
  title: 'Login',
  desc: 'Sign in to manage your library account.',
  footer: {
    question: "Don't have an account?",
    label: 'Register',
    href: AUTH_PATH.REGISTER,
  },
};

export const registerFields: FormFieldType[] = [
  {
    name: 'name',
    label: 'Name',
    autoComplete: 'name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    autoComplete: 'email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    autoComplete: 'tel',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    autoComplete: 'new-password',
    type: 'password',
  },
];

export const registerSection: AuthSectionProps = {
  title: 'Register',
  desc: 'Create your account to start borrowing books.',
  footer: {
    question: 'Already have an account?',
    label: 'Login',
    href: AUTH_PATH.LOGIN,
  },
};
