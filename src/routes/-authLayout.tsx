import {
  AppShell,
  Avatar,
  Badge,
  Box,
  Burger,
  Button,
  Divider,
  Group,
  NavLink,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { IconLogout2, IconReceipt, IconWallet } from '@tabler/icons-react'
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

export const AuthLayout = () => {
  const { user } = useAuth()
  const location = useLocation()
  const [opened, { toggle, close }] = useDisclosure(false)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { clearStore } = useApolloClient()
  const navigate = useNavigate()

  const navigateToReceipts = () => {
    close()
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
    close()
    void navigate({ to: '/login' })
  }

  if (error) {
    return <>{error}</>
  }

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ breakpoint: 'sm', collapsed: { mobile: !opened }, width: 320 }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger hiddenFrom="sm" opened={opened} onClick={toggle} size="sm" />
            <ThemeIcon
              size={36}
              radius="md"
              variant="gradient"
              gradient={{ deg: 140, from: 'teal', to: 'cyan' }}
            >
              <IconWallet size={18} />
            </ThemeIcon>
            <Box>
              <Title order={3}>EZsplit</Title>
              <Text size="xs" c="dimmed">Shared expense workspace</Text>
            </Box>
          </Group>

          <Badge variant="dot" color="teal">Online</Badge>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ background: 'linear-gradient(180deg, rgba(18, 184, 134, 0.08), rgba(34, 139, 230, 0.02))' }}>
        <Stack h="100%" justify="space-between" gap="md">
          <Stack gap="md">
            <Box p="sm" style={{ backgroundColor: 'var(--mantine-color-white)', border: '1px solid var(--mantine-color-gray-3)', borderRadius: '12px' }}>
              <Group gap="sm" wrap="nowrap">
                <Avatar color="teal" radius="xl" variant="light">
                  {(user?.username.charAt(0).toUpperCase()) ?? 'U'}
                </Avatar>
                <Box>
                  <Text size="xs" c="dimmed">Signed in as</Text>
                  <Text fw={600}>{user?.username ?? 'User'}</Text>
                </Box>
              </Group>
            </Box>

            <Stack gap={4}>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">Workspace</Text>
              <NavLink
                onClick={navigateToReceipts}
                label="Receipts"
                description="Manage receipts and totals"
                leftSection={<IconReceipt size={18} />}
                active={location.pathname.startsWith('/receipts')}
                variant="light"
              />
            </Stack>
          </Stack>

          <Stack gap="sm">
            <Divider />
            <Button
              variant="light"
              color="red"
              justify="flex-start"
              leftSection={<IconLogout2 size={18} />}
              onClick={onClickLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
