import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/type';

export const CategoryList = ({ children, className }: BaseComponentProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

// type CategoryListItemProps = {
//   data: CategoryItem;
// };

// export const CategoryListItem = ({ data }: CategoryListItemProps) => {
//   return (
//     <Card variant={'category'}>
//       <CardImageWrapper>
//         <CardImage src={data.icon} alt={data.label} />
//       </CardImageWrapper>
//       <CardTitle>{data.label}</CardTitle>
//     </Card>
//   );
// };
