import { useQuery } from "@apollo/client"
import { Table, Container, Title } from "@mantine/core"
import { ReceiptsQuery } from "@src/__generated__/graphql"
import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "@src/__generated__/gql"

const RECEIPTS_QUERY = graphql(`
  query Receipts {
    receipts {
      id
      description
      total
    }
  }
`)

export const Route = createFileRoute("/_auth/receipt")({
  component: ReceiptsPage,
})
function ReceiptsPage() {
  const { data, loading, error } = useQuery(RECEIPTS_QUERY)

  if (loading) {
    return <>Loading</>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <>Something went wrong</>
  }

  const { receipts } = data

  const displayData = (r: ReceiptsQuery["receipts"][0]) => {
    return (
      <Table.Tr key={r.id}>
        <Table.Td>{r.id}</Table.Td>
        <Table.Td>{r.description}</Table.Td>
        <Table.Td>{r.total}</Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Container>
      <Title order={1}>Receipts</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{receipts.map(displayData)}</Table.Tbody>
      </Table>
    </Container>
  )
}
