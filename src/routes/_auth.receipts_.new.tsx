import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/receipts/new")({
  component: () => <div>Hello /receipts/new!</div>,
})
