import {
  FilterBadge,
  FilterBadgeItem,
} from '@/app/user/profile/borrowed-list/components';
import { SectionWrapper } from '@/components/container';
import {
  SearchInputWrapper,
  SearchInput,
} from '@/components/container/search-input';
import { useBooksInfinite } from '@/hooks';
import { BOOK_STATUS_TABS } from './book.constants';
import React from 'react';
import { AdminBookCard, AdminBookCardItem } from './components';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH } from '@/lib/constants';

const AdminBookList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<string>('all');
  const { data } = useBooksInfinite();

  const books = data?.pages.flatMap((page) => page.data.books) ?? [];

  console.log(books, 'books');
  return (
    <SectionWrapper title='Book List' className='w-full'>
      <Button
        onClick={() => navigate(`${DASHBOARD_PATH.BOOK_LIST}/new`)}
        className='px-4 w-full md:max-w-60'
      >
        Add Book
      </Button>
      <SearchInputWrapper className='w-profile'>
        <SearchInput placeholder='Search book' name='search-book' />
      </SearchInputWrapper>

      <FilterBadge className='overflow-x-auto py-2'>
        {BOOK_STATUS_TABS.map((status) => (
          <FilterBadgeItem
            key={status.id}
            data={status}
            active={filter === status.id}
            onClick={() => setFilter(status.id)}
          >
            {status.label}
          </FilterBadgeItem>
        ))}
      </FilterBadge>
      <AdminBookCard>
        {books.map((book) => (
          <AdminBookCardItem book={book} key={book.id} />
        ))}
      </AdminBookCard>
    </SectionWrapper>
  );
};

export default AdminBookList;
