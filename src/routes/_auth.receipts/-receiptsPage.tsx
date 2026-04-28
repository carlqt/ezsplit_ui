import { useQuery } from '@apollo/client'
import { Alert, Badge, Button, Center, Container, Group, Paper, Skeleton, Stack, Table, Text, Title } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { useDisclosure } from '@mantine/hooks'
import { IconReceipt, IconPlus } from '@tabler/icons-react'
import { CreateReceiptModal } from './-createReceiptModal'
import { ReceiptsTableBody } from './-receiptsTableBody'

const RECEIPTS_QUERY = graphql(`
  query MeWithReceipts {
    me {
      id
      ...ReceiptsOnMe
    }
  }
`)

export const ReceiptsPage = () => {
  const { data, loading, error } = useQuery(RECEIPTS_QUERY)
  const [opened, { open, close }] = useDisclosure(false)

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Stack gap="md">
          <Skeleton height={28} radius="sm" />
          <Skeleton height={36} width={160} radius="sm" />
          <Skeleton height={220} radius="sm" />
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert color="red" title="Failed to load receipts">
          {error.message}
        </Alert>
      </Container>
    )
  }

  if (!data?.me) {
    return (
      <Container size="md" py="xl">
        <Center>
          <Text c="dimmed">No user data available.</Text>
        </Center>
      </Container>
    )
  }

  return (
    <Container size="lg" py="xl">
      <CreateReceiptModal
        opened={opened}
        close={close}
        userId={data.me.id}
      />

      <Stack gap="lg">
        <Paper withBorder radius="lg" p="lg">
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Group gap="xs" align="center">
                <IconReceipt size={20} />
                <Title order={2}>Receipts</Title>
              </Group>
              <Text c="dimmed" size="sm">
                Organize shared expenses and keep every total in one place.
              </Text>
            </Stack>

            <Group gap="sm">
              <Badge variant="light" color="gray" size="lg">
                My receipts
              </Badge>
              <Button onClick={open} color="teal" leftSection={<IconPlus size={16} />}>
                Create Receipt
              </Button>
            </Group>
          </Group>
        </Paper>

        <Paper withBorder radius="md" p="md">
          <Table.ScrollContainer minWidth={720}>
            <Table highlightOnHover striped verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Receipt</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                  <Table.Th style={{ width: 72 }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <ReceiptsTableBody data={data.me} />
            </Table>
          </Table.ScrollContainer>
        </Paper>
      </Stack>
    </Container>
  )
}
