import { SectionWrapper } from '@/components/container';
import {
  SearchInput,
  SearchInputWrapper,
} from '@/components/container/search-input';

const Reviews = () => {
  return (
    <SectionWrapper title='Borrowed List' className='w-full'>
      <SearchInputWrapper className='w-profile'>
        <SearchInput placeholder='Search Reviews' name='review' />
      </SearchInputWrapper>
    </SectionWrapper>
  );
};

export default Reviews;
