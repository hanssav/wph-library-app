import type { FormFieldType, UpdateProfileResponseData } from '@/type';
export type TextInfoProps = { label: string; value: string | number };

export const nameFIeld: FormFieldType = {
  name: 'name',
  label: 'Name',
  autoComplete: 'name',
  type: 'text',
};

export const profileData = (
  profile: UpdateProfileResponseData['profile']
): TextInfoProps[] => [
  {
    label: 'name',
    value: profile.name,
  },
  {
    label: 'email',
    value: profile.email,
  },
  {
    label: 'No Handphone',
    value: profile.id,
  },
  {
    label: 'role',
    value: profile.role,
  },
];
