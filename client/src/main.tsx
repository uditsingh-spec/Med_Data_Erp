import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/common/ErrorBoundary'
import { ToastProvider } from './context/ToastContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
