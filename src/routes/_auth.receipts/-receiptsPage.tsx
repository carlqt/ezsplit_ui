import { useQuery } from '@apollo/client'
import { Alert, Button, Center, Container, Group, Paper, Skeleton, Stack, Table, Text, Title } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { useDisclosure } from '@mantine/hooks'
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
    <Container size="md" py="xl">
      <CreateReceiptModal
        opened={opened}
        close={close}
        userId={data.me.id}
      />

      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Receipts</Title>
          <Button onClick={open} color="teal">
            Create Receipt
          </Button>
        </Group>

        <Paper withBorder radius="md" p="md">
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <ReceiptsTableBody data={data.me} />
          </Table>
        </Paper>
      </Stack>
    </Container>
  )
}
