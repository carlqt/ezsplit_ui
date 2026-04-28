import { useQuery } from '@apollo/client'
import { Alert, Badge, Container, Group, NumberFormatter, Paper, Skeleton, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { useAuth } from '@src/hooks/useAuth'
import { IconReceipt2, IconUser } from '@tabler/icons-react'
import { useParams } from '@tanstack/react-router'
import { CreateGuestModal } from './-createGuestModal'
import { ReceiptTable } from './-receiptTable'

const PUBLIC_RECEIPT = graphql(`
  query PublicReceipt($slug: String!) {
    publicReceipt(slug: $slug) {
      id
      total
      description
      ...PublicReceiptItems
    }
  }
`)

export const PublicReceiptPage = () => {
  const { receiptSlug } = useParams({ from: '/receipts/public/$receiptSlug/' })
  const { user, loading: userLoading } = useAuth()

  const { data: receiptQueryData, loading, error } = useQuery(PUBLIC_RECEIPT, {
    variables: {
      slug: receiptSlug,
    },
  })

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="md">
          <Skeleton height={120} radius="md" />
          <Skeleton height={320} radius="md" />
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Failed to load public receipt">
          {error.message}
        </Alert>
      </Container>
    )
  }

  if (!receiptQueryData?.publicReceipt) {
    return (
      <Container size="lg" py="xl">
        <Text c="dimmed">Public receipt not found.</Text>
      </Container>
    )
  }

  const userLabel = user?.username ?? 'Guest'
  const totalPayables = user?.totalPayables ?? 0

  return (
    <Container size="lg" py="xl">
      <CreateGuestModal opened={!userLoading && !user} />

      <Stack gap="lg">
        <Paper
          withBorder
          radius="lg"
          p="lg"
          style={{
            background: 'linear-gradient(135deg, rgba(18, 184, 134, 0.08), rgba(34, 139, 230, 0.06))',
          }}
        >
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Group gap="xs" align="center">
                <ThemeIcon variant="light" color="teal" radius="xl" size="md">
                  <IconReceipt2 size={16} />
                </ThemeIcon>
                <Badge variant="light" color="gray">Public receipt</Badge>
              </Group>
              <Title order={2}>{receiptQueryData.publicReceipt.description}</Title>
              <Text c="dimmed" size="sm">Choose the items you are sharing from this receipt.</Text>
            </Stack>

            <Stack gap="xs" align="flex-end">
              <Badge leftSection={<IconUser size={12} />} variant="light" color="teal">
                {userLabel}
              </Badge>
              <Text size="sm" c="dimmed">Your payable</Text>
              <Text fw={700} size="lg">
                <NumberFormatter prefix="$" value={totalPayables} thousandSeparator />
              </Text>
              <Text size="sm" c="dimmed">Receipt total</Text>
              <Text fw={600}>
                <NumberFormatter prefix="$" value={receiptQueryData.publicReceipt.total} thousandSeparator />
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Stack gap="xs">
          <Text size="sm" fw={600} c="dimmed">Items</Text>
          {user
            ? <ReceiptTable data={receiptQueryData.publicReceipt} user={user} />
            : <Text c="dimmed">Create a guest name to start selecting items.</Text>}
        </Stack>
      </Stack>
    </Container>
  )
}
