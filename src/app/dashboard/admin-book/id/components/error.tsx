import { TitleSection } from '../../components';

export const AdminBookIdError = () => {
  return (
    <div className='base-container'>
      <TitleSection>Preview Book</TitleSection>
      <div className='text-center py-10 text-red-500'>
        Book not found or failed to load.
      </div>
    </div>
  );
};
