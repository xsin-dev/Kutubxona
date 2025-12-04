import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStore } from './store/useStore' // Zustand store

import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css'

export const queryClient = new QueryClient()

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Playfair Display, serif",
  },
  primaryColor: "amber",
  colors: {
    amber: [
      "#fff8e1",
      "#ffecb3",
      "#ffe082",
      "#ffd54f",
      "#ffca28",
      "#ffc107",
      "#ffb300",
      "#ffa000",
      "#ff8f00",
      "#ff6f00",
    ],
  },
  radius: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
})

function ProvidersWrapper({ children }) {
  const isDark = useStore((state) => state.isDark) 
  return (
    <MantineProvider theme={theme} forceColorScheme={isDark ? "dark" : "light"}>
      <div className={isDark ? "dark" : ""}>{children}</div>
    </MantineProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ProvidersWrapper>
        <App />
      </ProvidersWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
)
