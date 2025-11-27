import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type TableColumn<T> = {
  id: string;
  label: string;
  className?: string;
  render: (item: T, rowNumber: number) => ReactNode;
};

type UsersTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  currentPage?: number;
  pageSize?: number;
  emptyMessage?: string;
  isLoading?: boolean;
  pagination?: ReactNode;
};

export const UsersTable = <T extends { id: number | string }>({
  data,
  columns,
  currentPage = 1,
  pageSize = 10,
  emptyMessage = 'No data available',
  isLoading = false,
  pagination,
}: UsersTableProps<T>) => {
  const isEmpty = !data || data.length === 0;

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className={cn('px-4 py-3 font-semibold', col.className)}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.id} className='px-4 py-3'>
                  <div className='h-5 bg-muted animate-pulse rounded' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.id}
              className={cn('px-4 py-3 font-semibold', col.className)}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {isEmpty ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className='text-center py-12 text-muted-foreground'
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((item, index) => {
            const rowNumber = (currentPage - 1) * pageSize + index + 1;
            return (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    className={cn('px-4 py-3', col.className)}
                  >
                    {col.render(item, rowNumber)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>

      {pagination && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className='p-0'>
              {pagination}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};
