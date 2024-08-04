import { Button, Container, Skeleton, Space, Stack, Title } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconChevronLeft } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { useQuery } from '@apollo/client'
import { ItemsTable } from './-itemsTable'

const RECEIPT_QUERY = graphql(`
  query Receipt($receiptId: ID!) {
    receipt(id: $receiptId) {
      id
      total
      items {
        id
        name
        price
      }
    }
  }
`)

const Receipt = () => {
  const { receiptId } = Route.useParams()
  const { data, loading, error } = useQuery(RECEIPT_QUERY, {
    variables: {
      receiptId: receiptId,
    },
  })

  const items = data?.receipt.items

  if (loading) {
    return <Skeleton visible={loading} height={100}></Skeleton>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  return (
    <Container>
      <Button leftSection={<IconChevronLeft />}>
        <Link to="/receipts">Back</Link>
      </Button>
      <Space h="md" />

      <Stack>
        <Title order={1}>Jollibee</Title>
        <Title order={2}>Price: $$$</Title>
      </Stack>

      {items && <ItemsTable RECEIPT_QUERY={RECEIPT_QUERY} receiptId={receiptId} items={items} />}
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId/')({
  component: Receipt
})
