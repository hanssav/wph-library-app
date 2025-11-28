import type { FormFieldType } from '@/type';

export const bookFields: FormFieldType[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter book title',
  },
  {
    name: 'isbn',
    label: 'Isbn',
    type: 'text',
    placeholder: 'Enter book isbn',
  },
  {
    name: 'authorId',
    label: 'Author',
    type: 'select',
    options: [],
  },
  {
    name: 'categoryId',
    label: 'Category',
    type: 'select',
    options: [],
  },
  {
    name: 'totalCopies',
    label: 'Number of Pages',
    type: 'number',
    placeholder: 'Number of pages',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter description',
  },
  {
    name: 'coverImage',
    label: 'Cover Image',
    type: 'text',
    placeholder: 'Enter image URL',
  },
];
