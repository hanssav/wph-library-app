import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4'>
      <div className='text-center space-y-8 w-full md:max-w-1/2'>
        <div className='mx-auto size-32 p-4 flex-center bg-primary-500 rounded-full aspect-square'>
          <AlertTriangle
            className='w-full h-full text-white'
            strokeWidth={1.5}
          />
        </div>

        <h1 className='text-6xl font-bold text-gray-900 tracking-tight'>404</h1>

        <p className='text-2xl font-semibold text-gray-700'>
          Oops! Page not found
        </p>

        <p className='text-gray-500 leading-relaxed'>
          Sorry, the page you're looking for doesn't exist or has been moved. It
          might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className='pt-6 w-full'>
          <Button asChild className='gap-2 px-10!'>
            <Link to='/'>
              <Home className='w-5 h-5' />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
