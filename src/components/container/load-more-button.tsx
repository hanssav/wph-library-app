import { Button } from '../ui/button';

type LoadMoreButtonProps = {
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <div className='w-full flex-center'>
      <Button
        className='w-[14vw] min-w-[150px]'
        variant='outline'
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={fetchNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
