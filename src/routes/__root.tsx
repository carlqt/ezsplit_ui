import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { SignupForm } from "../components/signup"
import { useQuery, gql } from '@apollo/client'

const ME = gql`
  query Me {
    me {
      id
      username
      totalPayables
    }
  }
`

const Root = () => {
  // const { error } = useQuery(ME)

  // if (error) {
  //   return <SignupForm />
  // }

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: () => <Root />
})
