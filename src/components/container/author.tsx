import { cn, getImage } from '@/lib/utils';
import type { Author, BaseComponentProps } from '@/type';
import { type ComponentProps } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Album } from 'lucide-react';

type AuthorsListProps = BaseComponentProps & ComponentProps<'div'>;

const AuthorsList = ({ children, className, ...props }: AuthorsListProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const AuthorCard = ({ author }: { author: Author }) => {
  return (
    <Card variant={'author'}>
      <Avatar className='size-[60px]'>
        {/* no image avatar from backend */}
        <AvatarImage src={getImage(author.name, 'avatar')} alt={author.name} />
      </Avatar>
      <CardContent>
        <CardTitle>{author.name}</CardTitle>
        <div className='flex items-center gap-1.5 flex-wrap'>
          <Album className='size-5 aspect-square stroke-white' fill='#1C65DA' />
          {/* no data*/}
          <CardDescription>{author.id} books</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export { AuthorsList, AuthorCard };
