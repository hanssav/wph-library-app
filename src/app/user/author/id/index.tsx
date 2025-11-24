import {
  AuthorCard,
  AuthorCardSkeleton,
  BookCard,
  BookCardSkeleton,
  BooksList,
  SectionWrapper,
} from '@/components/container';
import { useAuthor } from '@/hooks';
import { useParams } from 'react-router-dom';

const Author = () => {
  const { id } = useParams();
  const { data, isLoading } = useAuthor(Number(id));

  if (isLoading) {
    return (
      <div className='base-container'>
        <AuthorCardSkeleton />
        <SectionWrapper title='Books'>
          <BooksList>
            {Array.from({ length: 5 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </BooksList>
        </SectionWrapper>
      </div>
    );
  }

  if (!data?.success || !data.data.author) {
    return (
      <div className='base-container'>
        <h2 className='text-2xl font-bold'>Author Not Found</h2>
        <p className='text-neutral-500'>
          The author you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const { author, books } = data.data;

  return (
    <div className='base-container'>
      <AuthorCard author={author} />

      <SectionWrapper title={`Books List by ${author.name} (${books.length})`}>
        <BooksList>
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className='col-span-full py-16 text-center text-neutral-500'>
              This author has no books yet.
            </div>
          )}
        </BooksList>
      </SectionWrapper>
    </div>
  );
};

export default Author;
