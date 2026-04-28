import { useQuery } from '@apollo/client'
import { Alert, Badge, Button, Container, Group, NumberFormatter, Paper, Skeleton, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconChevronLeft, IconReceipt2 } from '@tabler/icons-react'
import { Link, useParams } from '@tanstack/react-router'
import { graphql } from '@src/__generated__/gql'
import { ItemsTable } from './-itemsTable'
import { ShareReceipt } from './-shareReceipt'

const RECEIPT_QUERY = graphql(`
  query Receipt($receiptId: ID!) {
    receipt(id: $receiptId) {
      id
      total
      description
      slug
      ...ReceiptItemList
    }
  }
`)

export const ReceiptPage = () => {
  const { receiptId } = useParams({ from: '/_auth/receipts/$receiptId/' })

  const { data, loading, error } = useQuery(RECEIPT_QUERY, {
    variables: {
      receiptId,
    },
  })

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="md">
          <Skeleton height={36} radius="sm" width={180} />
          <Skeleton height={120} radius="md" />
          <Skeleton height={280} radius="md" />
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Failed to load receipt">
          {error.message}
        </Alert>
      </Container>
    )
  }

  if (!data?.receipt) {
    return (
      <Container size="lg" py="xl">
        <Text c="dimmed">Receipt not found.</Text>
      </Container>
    )
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group>
          <Link to="/receipts" style={{ textDecoration: 'none' }}>
            <Button variant="subtle" leftSection={<IconChevronLeft size={16} />}>
              Back to receipts
            </Button>
          </Link>
        </Group>

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
                <Badge variant="light" color="gray">Receipt details</Badge>
              </Group>
              <Group gap="xs">
                <Title order={2}>{data.receipt.description}</Title>
              </Group>
              <Text c="dimmed" size="sm">Review itemized entries and keep everyone aligned.</Text>
            </Stack>

            <Stack gap={2} align="flex-end">
              <Text size="sm" c="dimmed">Total</Text>
              <Text fw={700} size="xl">
                <NumberFormatter prefix="$" value={data.receipt.total} thousandSeparator />
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Stack gap="xs">
          <Text size="sm" fw={600} c="dimmed">Sharing</Text>
          <ShareReceipt slug={data.receipt.slug} receiptId={data.receipt.id} />
        </Stack>

        <Stack gap="xs">
          <Text size="sm" fw={600} c="dimmed">Items</Text>
          <ItemsTable receiptId={receiptId} data={data.receipt} />
        </Stack>
      </Stack>
    </Container>
  )
}
