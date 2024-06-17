import { AppShell, Group, Burger, NavLink } from "@mantine/core"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { IconReceipt, IconLogout2 } from "@tabler/icons-react"
import { useAuth } from "@src/useAuth"

const AuthLayout = () => {
  const { user } = useAuth()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: false } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger  hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <h2>Hi {user}</h2>
        <NavLink label="Receipts" leftSection={<IconReceipt />} />
        <NavLink label="Logout" leftSection={<IconLogout2 />} />
      </AppShell.Navbar>
      <AppShell.Main><Outlet /></AppShell.Main>
    </AppShell>
  )
}

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/sign_up",
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})
