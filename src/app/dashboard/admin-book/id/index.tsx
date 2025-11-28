import { BookDetails } from '@/components/pages/book/book-detail';
import { TitleSection } from '../components';
import { useBook } from '@/hooks';
import { useParams } from 'react-router-dom';
import { AdminBookIdLoading } from './components/loading';
import { AdminBookIdError } from './components/error';

const AdminBookDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useBook(Number(id));

  if (isLoading) {
    return <AdminBookIdLoading />;
  }

  if (isError || !data?.data) {
    return <AdminBookIdError />;
  }

  return (
    <div className='base-container'>
      <TitleSection>Preview Book</TitleSection>
      <BookDetails book={data?.data} />
    </div>
  );
};

export default AdminBookDetail;
