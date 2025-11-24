import {
  Card,
  CardImageWrapper,
  CardImage,
  CardTitle,
} from '@/components/ui/card';
import { CategoryList, HeroCarousel } from './components';
import { CATEGORY_LIST, heroSlides } from './home.constants';
import {
  AuthorCard,
  AuthorCardSkeleton,
  AuthorsList,
  QueryStateComp,
  SectionWrapper,
} from '@/components/container';
import type { BookSearchParams } from '@/type';
import React from 'react';
import { useAuthors } from '@/hooks/use-author';
import { BookInfiniteList } from '@/components/container/book-infinite-list';

const Home = () => {
  const limit = 10;
  const [params] = React.useState<BookSearchParams>({ limit });

  const { data: authorsData, isLoading: isAuthorLoading } = useAuthors();

  const authors = authorsData?.data.authors ?? [];

  return (
    <div className='base-container'>
      <HeroCarousel data={heroSlides} />
      <CategoryList>
        {CATEGORY_LIST.map((data) => (
          <Card variant={'category'} key={data.id}>
            <CardImageWrapper>
              <CardImage src={data.icon} alt={data.label} />
            </CardImageWrapper>
            <CardTitle>{data.label}</CardTitle>
          </Card>
        ))}
      </CategoryList>
      <SectionWrapper title='Recommendation'>
        <BookInfiniteList params={params} />
      </SectionWrapper>
      <SectionWrapper title='Popular Authors'>
        <AuthorsList>
          <QueryStateComp
            isLoading={isAuthorLoading}
            skeleton={
              <>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <AuthorCardSkeleton key={idx} />
                ))}
              </>
            }
          >
            {authors.map((author) => (
              <AuthorCard author={author} key={author.id} />
            ))}
          </QueryStateComp>
        </AuthorsList>
      </SectionWrapper>
    </div>
  );
};

export default Home;
