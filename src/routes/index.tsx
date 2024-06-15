import { Link, createFileRoute, redirect } from "@tanstack/react-router"

const HomePage = () => {
  return (
    <div>
      <div>
        <Link to="/dashboard" className="text-blue-500">
          Dashboard
        </Link>
      </div>

      <div>
        <Link to="/about" className="text-blue-500">
          About
        </Link>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: HomePage,
})
