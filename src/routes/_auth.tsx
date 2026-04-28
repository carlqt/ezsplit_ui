import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { AuthLayout } from './-authLayout'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      // Disabling error because this is the documented way to redirect. https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction#examples
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/login',
      })
    }
  },
  component: AuthLayout,
})
