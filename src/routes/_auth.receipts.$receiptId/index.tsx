import { Button, Container, Grid, Skeleton, Space, Title, Divider } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconChevronLeft } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { useQuery } from '@apollo/client'
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

const Receipt = () => {
  const { receiptId } = Route.useParams()
  const { data, loading, error } = useQuery(RECEIPT_QUERY, {
    variables: {
      receiptId: receiptId,
    },
  })

  if (loading) {
    return <Skeleton visible={loading} height={100}></Skeleton>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <>Error: Empty response</>
  }

  return (
    <Container>
      <Button leftSection={<IconChevronLeft />}>
        <Link to="/receipts">Back</Link>
      </Button>

      <Title order={1}>{data?.receipt.description}</Title>

      <Divider />
      <Space h="md" />

      <Grid>
        <Grid.Col span="content">
          <Title order={2}>Price:</Title>
        </Grid.Col>

        <Grid.Col span={4}>
          <Title order={2}>{data.receipt.total}</Title>
        </Grid.Col>
      </Grid>

      <ShareReceipt slug={data.receipt.slug ?? ""} receiptId={data.receipt.id ?? ""} />

      <ItemsTable receiptId={receiptId} data={data.receipt} />
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId/')({
  component: Receipt
})
