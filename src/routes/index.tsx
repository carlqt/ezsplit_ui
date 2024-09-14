import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <></>,
  beforeLoad: () => {
    // Redirect to what's considered the "ROOT PATH"
    redirect({ to: '/receipts', throw: true })
  },
})
