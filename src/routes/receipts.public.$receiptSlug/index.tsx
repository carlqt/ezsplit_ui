import { useQuery } from '@apollo/client'
import { Container, Skeleton, Table, TableData, Title } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { User } from '@src/__generated__/graphql'
import { createFileRoute } from '@tanstack/react-router'

const PUBLIC_RECEIPT = graphql(`
  query PublicReceipt($slug: String!) {
    publicReceipt(slug: $slug) {
      id
      total
      description
      items {
        id
        name
        price
        sharedBy {
          id
          username
        }
      }
    }
  }
`)

type SharedBy = Omit<User, 'state'>

const PublicReceipt = () => {
  const { receiptSlug } = Route.useParams()

  const { data, loading, error } = useQuery(PUBLIC_RECEIPT, {
    variables: {
      slug: receiptSlug,
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

  const joinedUsernames = (users: SharedBy[]): string => {
    return users.map((u) => u.username).join(', ')
  }

  const tableData: TableData = {
    caption: `Item list in ${data.publicReceipt.description}`,
    head: ['id', 'name', 'price', 'sharedBy'],
    body: data.publicReceipt.items.map((i) => {
      return [i.id, i.name, i.price, joinedUsernames(i.sharedBy)]
    })
  }

  return (
    <Container>
      <Title order={1}>{data.publicReceipt.description}</Title>
      <Title order={2}>{data.publicReceipt.total}</Title>
      <Table data={tableData} />
    </Container>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

