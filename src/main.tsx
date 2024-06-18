import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen.ts"
import "./index.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { useAuth } from "./useAuth.ts"
import { createTheme, MantineProvider } from "@mantine/core"

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultPreload: "intent",
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/query",
  cache: new InMemoryCache(),
})

// eslint-disable-next-line react-refresh/only-export-components
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
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
})


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <InnerApp />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
)
