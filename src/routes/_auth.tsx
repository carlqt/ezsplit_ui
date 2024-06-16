import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/sign_up",
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})
