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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import type { FormFieldType } from '@/type';

type Props<T extends FieldValues> = {
  control: Control<T>;
  config: FormFieldType;
};

const FormFields = <T extends FieldValues>({ control, config }: Props<T>) => {
  const { type, placeholder, autoComplete, options } = config;

  return (
    <FormField
      control={control}
      name={config.name as Path<T>}
      render={({ field }) => {
        let InputComponent: React.ReactNode = null;

        switch (type) {
          case 'textarea':
            InputComponent = (
              <Textarea
                placeholder={placeholder}
                {...field}
                className='min-h-[100px] max-h-96 resize-none overflow-y-auto'
              />
            );
            break;

          case 'select':
            InputComponent = (
              <Select
                onValueChange={field.onChange}
                value={field.value ? String(field.value) : ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder || 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
            break;

          case 'number':
            InputComponent = (
              <Input
                type='number'
                placeholder={placeholder}
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            );
            break;

          case 'file':
            InputComponent = (
              <Input
                type='file'
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              />
            );
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
