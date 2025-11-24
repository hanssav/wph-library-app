import { BookInfiniteList, SectionWrapper } from '@/components/container';
import type { BookSearchParams } from '@/type';
import React from 'react';
import SelectFilter from './components/select-filter';
import {
  FilterCheckboxItem,
  FilterSection,
  FilterSectionTitle,
  RatingFilterItem,
} from './components';
import { CATEGORY_FILTERS } from './components/filter.costants';
import Hr from '@/components/ui/hr';
import { Card } from '@/components/ui/card';

const BooksList = () => {
  const [params] = React.useState<BookSearchParams>({ limit: 10 });

  return (
    <SectionWrapper title='Book List' className='base-container'>
      <div className='grid grid-cols-1 lg:grid-cols-13 gap-6 lg:gap-10'>
        <SelectFilter />
        <aside className='lg:col-span-3 hidden lg:block'>
          <Card variant={'base'}>
            <FilterSectionTitle>FILTER </FilterSectionTitle>
            <FilterSection title='Category' className='space-y-4'>
              {CATEGORY_FILTERS.map((category) => (
                <FilterCheckboxItem
                  key={category.id}
                  id={category.id}
                  label={category.label}
                />
              ))}
            </FilterSection>
            <Hr />
            <FilterSection title='Rating' className='space-y-4'>
              {[5, 4, 3, 2, 1].map((rating) => (
                <RatingFilterItem key={rating} rating={rating} />
              ))}
            </FilterSection>
          </Card>
        </aside>
        <div className='lg:col-span-10'>
          <BookInfiniteList
            className='lg:grid-cols-4'
            params={params}
            isInfinite={false}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BooksList;
