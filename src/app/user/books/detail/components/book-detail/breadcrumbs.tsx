import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbsDetail = ({ book }: { book: string }) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean); // ["books", "7"]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className='h-4 w-4' />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/category'>Books</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments[0] === 'books' && segments[1] && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className='h-4 w-4' />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {book ? (
                <BreadcrumbPage>{book}</BreadcrumbPage>
              ) : (
                <BreadcrumbPage>Loading...</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsDetail;
