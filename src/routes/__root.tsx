import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { IAuthContext } from "../auth"

const Root = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

interface MyRouterContext {
  auth: IAuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})
