import { MeQuery } from '@src/__generated__/graphql'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const Root = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 container">
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  )
}

interface MyRouterContext {
  auth: {
    isAuthenticated: boolean
    user: MeQuery['me']
  } | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})
