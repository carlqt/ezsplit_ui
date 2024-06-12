import { createLazyFileRoute } from '@tanstack/react-router'
import { SignUpPage } from './-sign_up'

export const Route = createLazyFileRoute('/sign_up/')({
  component: () => <SignUpPage />
})
