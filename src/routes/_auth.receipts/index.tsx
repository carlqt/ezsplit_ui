import { useQuery } from "@apollo/client"
import { Table, Container, Title, Button, Skeleton } from "@mantine/core"
import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "@src/__generated__/gql"
import { useDisclosure } from "@mantine/hooks"
import { CreateReceiptModal } from "./-createReceiptModal"
import { ReceiptsTableBody } from "./-receiptsTableBody"

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

const ReceiptsPage = () => {
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

  // TODO: Placeholder to refactor
  if (!data.me) {
    return <></>
  }

  const { receipts } = data.me

  return (
    <Container>
      <CreateReceiptModal
        opened={opened}
        close={close}
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

        <ReceiptsTableBody receipts={receipts} />
      </Table>
    </Container>
  )
}

export const Route = createFileRoute("/_auth/receipts/")({
  component: ReceiptsPage,
})
