import { useParams } from 'react-router-dom';
import { TitleSection } from '../components';
import { Form } from '@/components/ui/form';
import { FormFields } from '@/components/container';
import { Button } from '@/components/ui/button';
import { TextLoading } from '@/components/pages/auth';
import { useBookFields } from './hooks/use-book-fields';
import { useBookForm } from './hooks/use-book-form';

type AdminBookFormProps = {
  mode: 'create' | 'edit';
};

const AdminBookForm = ({ mode }: AdminBookFormProps) => {
  const { fields } = useBookFields();
  const { id } = useParams<{ id: string }>();
  const isCreate = mode === 'create';

  const { form, mutationLoading, onSubmit } = useBookForm(id, isCreate);
  const title = isCreate ? 'Create' : 'Edit';

  return (
    <div className='base-container w-full max-w-[529px]'>
      <TitleSection>{title} Book</TitleSection>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          {fields.map((item) => (
            <FormFields key={item.name} control={form.control} config={item} />
          ))}
          <Button type='submit' widthFull>
            {mutationLoading ? <TextLoading>Saving..</TextLoading> : 'Save'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminBookForm;
