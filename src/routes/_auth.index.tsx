import { Link, createFileRoute } from "@tanstack/react-router"

const HomePage = () => {
  return (
    <div>
      <h1>Index page</h1>
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

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
})
