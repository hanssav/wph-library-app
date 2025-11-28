import { DetailInfoSkeleton } from '@/components/pages/book/book-detail';
import { TitleSection } from '../../components';

export const AdminBookIdLoading = () => {
  return (
    <div className='base-container'>
      <DetailInfoSkeleton />
      <TitleSection>Preview Book</TitleSection>
    </div>
  );
};
