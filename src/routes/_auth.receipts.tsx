import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/receipts')({
  component: () => <div>Hello /_auth/receipts!</div>
})