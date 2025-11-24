import { SectionWrapper } from '@/components/container';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMe } from '@/hooks';
import { getImage, avatarImage } from '@/lib/utils';

type TextInfoProps = { label: string; value: string | number };

const TextInfo = ({ label, value }: TextInfoProps) => (
  <div className='flex-between'>
    <p className='text-sm-medium lg:text-md-medium text-[#0A0D12]'>{label}</p>
    <h2 className='text-sm-bold lg:text-md-bold'>{value}</h2>
  </div>
);
const Profile = () => {
  const { data } = useMe();

  if (!data) return null;

  const { profile } = data.data;
  const profileData: TextInfoProps[] = [
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
      value: profile.id, //no data
    },
    {
      label: 'role',
      value: profile.role,
    },
  ];
  return (
    <SectionWrapper title='Profile'>
      <Card className='p-4 space-y-4 rounded-[12px] w-full md:w-[60vw] lg:w-[39vw] '>
        <div className='space-y-2 lg:space-y-3 '>
          <Avatar className='size-16 md:size-12 cursor-pointer'>
            {/* no data image from backend */}
            <AvatarImage
              src={getImage(avatarImage, 'avatar')}
              alt={profile.name}
            />
          </Avatar>
          {profileData.map((profile) => (
            <TextInfo {...profile} key={profile.value} />
          ))}
        </div>
        <Button widthFull>Update Profile</Button>
      </Card>
    </SectionWrapper>
  );
};

export default Profile;
