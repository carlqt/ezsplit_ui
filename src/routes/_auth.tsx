import { AppShell, Group, Burger, NavLink, Title } from '@mantine/core'
import {
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { IconReceipt, IconLogout2 } from '@tabler/icons-react'
import { useAuth } from '@src/hooks/useAuth'
import { useApolloClient, useMutation } from '@apollo/client'
import { graphql } from '@src/__generated__/gql'
import {
  LogoutUserMutation,
  LogoutUserMutationVariables,
} from '@src/__generated__/graphql'

const LOGOUT_USER = graphql(`
  mutation LogoutUser {
    logoutUser
  }
`)

const AuthLayout = () => {
  const { user } = useAuth()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { clearStore } = useApolloClient()
  const navigate = useNavigate()

  const navigateToReceipts = () => {
    void navigate({ to: '/receipts' })
  }

  const [logout, { error }] = useMutation<
    LogoutUserMutation,
    LogoutUserMutationVariables
  >(LOGOUT_USER)

  // TODO: Identify why calling clearStore() produces a console error
  const onClickLogout = () => {
    void logout()
    void clearStore()
    void navigate({ to: '/login' })
  }

  if (error) {
    return <>{error}</>
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: false } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger hiddenFrom="sm" size="sm" />
          <Title order={1}>EZsplit</Title>
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Title order={3}>
          Hi
          {user?.username}
        </Title>
        <NavLink
          onClick={navigateToReceipts}
          label="Receipts"
          leftSection={<IconReceipt />}
        />
        <NavLink
          onClick={onClickLogout}
          label="Logout"
          leftSection={<IconLogout2 />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      // Disabling error because this is the documented way to redirect. https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction#examples
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})
