import { Button, Container, Grid, Skeleton, Space, Title, Divider, ActionIcon, rem, TextInput } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconArrowRight, IconChevronLeft } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { useQuery } from '@apollo/client'
import { ItemsTable } from './-itemsTable'

const RECEIPT_QUERY = graphql(`
  query Receipt($receiptId: ID!) {
    receipt(id: $receiptId) {
      id
      total
      description
      slug
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

      <Title order={1}>{data?.receipt.description}</Title>

      <Divider />
      <Space h="md" />

      <Grid>
        <Grid.Col span="content">
          <Title order={2}>Price:</Title>
        </Grid.Col>

        <Grid.Col span={4}>
          <Title order={2}>{data?.receipt.total}</Title>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span="content">
          <Title order={2}>Share:</Title>
        </Grid.Col>

        <Grid.Col span={4}>
          <TextInput
            disabled
            size="md"
            placeholder={data?.receipt.slug}
            rightSectionWidth={42}
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled">
                <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
            }
          />
        </Grid.Col>
      </Grid>

      {items && <ItemsTable receiptId={receiptId} items={items} />}
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId/')({
  component: Receipt
})
