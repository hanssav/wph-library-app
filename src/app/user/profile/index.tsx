import {
  FormFields,
  QueryStateComp,
  SectionWrapper,
} from '@/components/container';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useMe, useUpdateMe } from '@/hooks';
import { getImage } from '@/lib/utils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema, type UpdateProfileReq } from '@/schema';
import { Form } from '@/components/ui/form';
import React from 'react';
import { nameFIeld, profileData } from './profile.constants';
import { TextInfo } from '@/components/pages/profile/text-info';
import { ProfileCardSkeleton } from '@/components/pages/profile/profile-card-skeleton';
import { avatarImage } from '@/constants';

const Profile = () => {
  const { data, isLoading } = useMe();
  const updateProfile = useUpdateMe();
  const [open, setOpen] = React.useState(false);

  const form = useForm<UpdateProfileReq>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: '',
    },
  });

  React.useEffect(() => {
    if (data?.data.profile) {
      form.reset({
        name: data.data.profile.name || '',
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<UpdateProfileReq> = (val) => {
    updateProfile.mutate(val.name);
    setOpen(false);
    updateProfile.reset();
  };

  if (!data) return null;
  const { profile } = data.data;

  return (
    <SectionWrapper title='Profile'>
      <QueryStateComp
        isLoading={isLoading}
        skeleton={<ProfileCardSkeleton />}
        fallback={<div>Something went wrong</div>}
      >
        <Card className='p-4 space-y-4 rounded-[12px] w-full md:w-[60vw] lg:w-[39vw] '>
          <div className='space-y-2 lg:space-y-3 '>
            <Avatar className='size-16'>
              <AvatarImage
                src={getImage(avatarImage, 'avatar')}
                alt={profile.name}
              />
            </Avatar>
            {profileData(profile).map((profile) => (
              <TextInfo {...profile} key={profile.value} />
            ))}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button widthFull>Update Profile</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid gap-4 py-4 space-y-2'>
                    <DialogHeader className='space-y-3'>
                      <DialogTitle>Update Profile</DialogTitle>
                      <DialogDescription>update profile name</DialogDescription>
                    </DialogHeader>
                    <FormFields control={form.control} config={nameFIeld} />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button size={'sm'} variant='outline' type='button'>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type='submit'
                      size='sm'
                      disabled={updateProfile.isPending}
                    >
                      {updateProfile.isPending ? 'Saving...' : 'Save changes'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </Card>
      </QueryStateComp>
    </SectionWrapper>
  );
};

export default Profile;
