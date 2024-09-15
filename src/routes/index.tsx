import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Redirect to what's considered the "ROOT PATH"
    redirect({ throw: true, to: '/receipts' })
  },
  component: () => <></>,
})
