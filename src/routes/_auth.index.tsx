import { createFileRoute } from "@tanstack/react-router"

const HomePage = () => {
  return (
    <div>
      <h1>Index page</h1>
    </div>
  )
}

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
})
