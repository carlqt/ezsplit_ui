import { useQuery } from "@apollo/client"
import {
  Table,
  Container,
  Title,
  NumberFormatter,
  Button,
  Skeleton,
  ActionIcon,
} from "@mantine/core"
import { MeWithReceiptsQuery } from "@src/__generated__/graphql"
import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "@src/__generated__/gql"
import { useDisclosure } from "@mantine/hooks"
import { CreateReceiptModal } from "./-createReceiptModal"
import { IconTrash } from "@tabler/icons-react"

const RECEIPTS_QUERY = graphql(`
  query MeWithReceipts {
    me {
      id
      receipts {
        id
        description
        total
      }
    }
  }
`)

const DELETE_RECEIPT = graphql(`
  mutation DeleteMyReceipt {
    deleteMyReceipt
  }
`)

export const Route = createFileRoute("/_auth/receipts/")({
  component: ReceiptsPage,
})

function ReceiptsPage() {
  const { data, loading, error } = useQuery(RECEIPTS_QUERY)
  const [opened, { open, close }] = useDisclosure(false)

  if (loading) {
    return <Skeleton visible={loading} height={100}></Skeleton>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <>Something went wrong</>
  }

  const { receipts } = data.me

  const displayData = (r: MeWithReceiptsQuery["me"]["receipts"][0]) => {
    return (
      <Table.Tr key={r.id}>
        <Table.Td>{r.id}</Table.Td>
        <Table.Td>{r.description}</Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="$"
            value={r.total || 0}
            thousandSeparator={true}
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon variant="transparent">
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Container>
      <CreateReceiptModal
        opened={opened}
        close={close}
        RECEIPTS_QUERY={RECEIPTS_QUERY}
      />

      <Title order={1}>Receipts</Title>
      <Button onClick={open} variant="filled" color="teal">
        Create Receipt
      </Button>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{receipts.map(displayData)}</Table.Tbody>
      </Table>
    </Container>
  )
}
