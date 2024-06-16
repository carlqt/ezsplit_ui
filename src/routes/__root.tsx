import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

const Root = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

interface MyRouterContext {
  auth: {
    isAuthenticated: boolean
    user: string | undefined
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})
