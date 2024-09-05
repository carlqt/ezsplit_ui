import { useQuery } from '@apollo/client'
import { Container, SimpleGrid, Skeleton, Table, TableData, Title } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { User } from '@src/__generated__/graphql'
import { useAuth } from '@src/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { CreateGuestModal } from './-createGuestModal'

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

// TODO:
// 1. Call Me Query
// 2. If Me is nil -> Show a modal asking for a username
// 3. If Me is not nil -> continue viewing the page

const PublicReceipt = () => {
  const { receiptSlug } = Route.useParams()

  const { data: receiptQueryData, loading, error } = useQuery(PUBLIC_RECEIPT, {
    variables: {
      slug: receiptSlug,
    },
  })

  const { user, loading: userLoading }= useAuth()

  if (loading) {
    return <Skeleton visible={loading} height={100}></Skeleton>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!receiptQueryData) {
    return <>Error: Empty response</>
  }

  const joinedUsernames = (users: SharedBy[]): string => {
    return users.map((u) => u.username).join(', ')
  }

  const tableData: TableData = {
    caption: `Item list in ${receiptQueryData.publicReceipt.description}`,
    head: ['id', 'name', 'price', 'sharedBy'],
    body: receiptQueryData.publicReceipt.items.map((i) => {
      return [i.id, i.name, i.price, joinedUsernames(i.sharedBy)]
    })
  }

  return (
    <Container>
      <CreateGuestModal opened={!userLoading && !user} />

      <Title order={1}>{user?.username || 'GUEST'}</Title>

      <SimpleGrid cols={2}>
        <Title order={1}>{receiptQueryData.publicReceipt.description}</Title>
        <Title order={2}>{receiptQueryData.publicReceipt.total}</Title>
      </SimpleGrid>

      <Table data={tableData} />
    </Container>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

