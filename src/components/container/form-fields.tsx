import type { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FormFieldType } from '@/type';

type Props<T extends FieldValues> = {
  control: Control<T>;
  config: FormFieldType;
};

const FormFields = <T extends FieldValues>({ control, config }: Props<T>) => {
  const { type, placeholder, autoComplete } = config;

  return (
    <FormField
      control={control}
      name={config.name as Path<T>}
      render={({ field }) => {
        let InputComponent = null;

        switch (type) {
          case 'textarea':
            InputComponent = <Textarea placeholder={placeholder} {...field} />;
            break;
          case 'file':
            InputComponent = <Input type='file' onChange={field.onChange} />;
            break;
          default:
            InputComponent = (
              <Input
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...field}
              />
            );
            break;
        }

        return (
          <FormItem className='space-y-0.5'>
            <FormLabel>{config.label}</FormLabel>
            <FormControl>{InputComponent}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormFields;
