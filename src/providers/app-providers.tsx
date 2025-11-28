import { getErrorMessage } from '@/api';
import { store } from '@/store';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { toast, Toaster } from 'sonner';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // max fresh data
      gcTime: 1000 * 60 * 10, // cacche time
    },
    mutations: {
      retry: false,
    },
  },
});

const AppProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position='top-right' />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
