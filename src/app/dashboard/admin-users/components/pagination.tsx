import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type DataPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  isLoading?: boolean;
  showInfo?: boolean;
};

export const DataPagination = ({
  currentPage,
  totalPages,
  totalItems,
  onNextPage,
  onPrevPage,
  onPageChange,
  hasNextPage = true,
  hasPrevPage = true,
  isLoading = false,
  showInfo = true,
}: DataPaginationProps) => {
  const renderPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between px-4 py-2.5'>
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

        <div className={showInfo ? 'ml-auto' : 'mx-auto'}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (!isLoading && hasPrevPage && onPrevPage) {
                      onPrevPage();
                    }
                  }}
                  aria-disabled={!hasPrevPage || isLoading}
                  className={
                    !hasPrevPage || isLoading
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer text-foreground hover:text-foreground'
                  }
                />
              </PaginationItem>

              {renderPageNumbers().map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                const isActive = currentPage === page;

                return (
                  <PaginationItem key={page}>
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
                    if (!isLoading && hasNextPage && onNextPage) {
                      onNextPage();
                    }
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
        </div>
      </div>
    </div>
  );
};
