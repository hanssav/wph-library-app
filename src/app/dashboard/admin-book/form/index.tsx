import { useParams } from 'react-router-dom';
import { TitleSection } from '../components';

type AdminBookFormProps = {
  mode: 'create' | 'edit';
};

const AdminBookForm = ({ mode }: AdminBookFormProps) => {
  const { id } = useParams<{ id: string }>();
  const isCreate = mode === 'create';
  const title = isCreate ? 'Create' : 'Edit';
  return (
    <div className='base-container'>
      <TitleSection>
        {title} Book {id}
      </TitleSection>
    </div>
  );
};

export default AdminBookForm;
