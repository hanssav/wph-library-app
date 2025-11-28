import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationCompProps = {
  currentPage: number;
  totalPages: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  isLoading?: boolean;
};

export const PaginationComp = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onPageChange,
  hasNextPage = true,
  hasPrevPage = true,
  isLoading = false,
}: PaginationCompProps) => {
  const renderPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('ellipsis');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('ellipsis');

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className='flex-between'>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (!isLoading && hasPrevPage && onPrevPage) onPrevPage();
            }}
            aria-disabled={!hasPrevPage || isLoading}
            className={
              !hasPrevPage || isLoading
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {renderPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <PaginationItem
                key={`ellipsis-${index}`}
                className='hidden md:block'
              >
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isActive = currentPage === page;
          const isFirstOrLast = page === 1 || page === totalPages;
          const isNearCurrent = Math.abs(page - currentPage) <= 1;

          return (
            <PaginationItem
              key={page}
              className={
                isFirstOrLast || isActive
                  ? 'block'
                  : isNearCurrent
                  ? 'hidden md:block'
                  : 'hidden md:block'
              }
            >
              <PaginationLink
                onClick={() => {
                  if (!isLoading && !isActive && onPageChange) {
                    onPageChange(page);
                  }
                }}
                isActive={isActive}
                aria-disabled={isLoading || isActive}
                className={
                  isLoading
                    ? 'pointer-events-none opacity-50'
                    : isActive
                    ? 'pointer-events-none rounded-md'
                    : 'cursor-pointer'
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (!isLoading && hasNextPage && onNextPage) onNextPage();
            }}
            aria-disabled={!hasNextPage || isLoading}
            className={
              !hasNextPage || isLoading
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

type DataPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  children?: React.ReactNode;
  showInfo?: boolean;
};

export const DataPagination = ({
  currentPage,
  totalPages,
  totalItems,
  showInfo = true,
  children,
}: DataPaginationProps) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5'>
        {showInfo && (
          <div className='text-xs text-neutral-950'>
            <span>
              Page{' '}
              <span className='font-medium text-neutral-900'>
                {currentPage}
              </span>{' '}
              of{' '}
              <span className='font-medium text-neutral-900'>{totalPages}</span>
            </span>
            {totalItems !== undefined && (
              <span className='ml-2'>
                • Total{' '}
                <span className='font-medium text-neutral-900'>
                  {totalItems}{' '}
                </span>
                items
              </span>
            )}
          </div>
        )}

        <div className={showInfo ? 'sm:ml-auto' : 'mx-auto'}>{children}</div>
      </div>
    </div>
  );
};
