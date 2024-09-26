import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useAuth } from './hooks/useAuth.ts'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const router = createRouter({
  context: { auth: undefined },
  defaultPreload: 'intent',
  routeTree,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
  uri: 'http://localhost:3000/api/query',
})

const InnerApp = () => {
  const auth = useAuth()

  if (auth.loading) {
    return <></>
  }

  return (
    // Need to understand why it's failing without suspense
    <RouterProvider router={router} context={{ auth }} />
  )
}

const theme = createTheme({
  defaultRadius: 'md',
  fontFamily: 'Montserrat, sans-serif',
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-right" />

        <InnerApp />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
