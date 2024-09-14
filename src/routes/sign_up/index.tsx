import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from './-sign_up'

export const Route = createFileRoute('/sign_up/')({
  component: SignupForm,
})
