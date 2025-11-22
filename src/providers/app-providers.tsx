import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
