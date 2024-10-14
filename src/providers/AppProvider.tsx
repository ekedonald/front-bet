import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, Suspense } from 'react';
import ScrollToTopButton from '@/components/Elements/ScrollToTop/ScrollToTopButton';
import { Toaster } from 'sonner';
import { NetworkIndicator } from '@/components/Elements/NetworkIndicator';
import { ErrorBoundary } from '@/components/Layouts';
import { queryClient } from '@/libs/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useColorMode } from '@/hooks';
import { Loading } from '@/components/Elements';

export default function AppProvider({
  children,
}: {
  children: ReactNode
}) {
  const handleQueryClient = queryClient;
  const { color } = useColorMode('light');

  return (
    <Suspense
      fallback={<Loading />}
    >
      <ErrorBoundary>
        <HelmetProvider>
          <NetworkIndicator />
          {/* <ThemeProvider attribute="class" defaultTheme='light'> */}
            <QueryClientProvider client={handleQueryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ScrollToTopButton />
              <Toaster 
                richColors 
                position='top-center' 
                theme={color}
              />
              <main className="font-body dark:text-white text-gray-600">
                {children}
              </main>
            </QueryClientProvider>
          {/* </ThemeProvider> */}
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
