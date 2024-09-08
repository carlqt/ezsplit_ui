import { useQuery } from '@apollo/client'
import { Container, SimpleGrid, Skeleton, Title } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { useAuth } from '@src/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { CreateGuestModal } from './-createGuestModal'
import { ReceiptTable } from './-receiptTable'

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

const PublicReceipt = () => {
  const { receiptSlug } = Route.useParams()

  const { data: receiptQueryData, loading, error } = useQuery(PUBLIC_RECEIPT, {
    variables: {
      slug: receiptSlug,
    },
  })

  const { user, loading: userLoading }= useAuth()
  const userDetails = `${user?.username || 'GUEST'} - ${user?.totalPayables ?? 0}`

  if (loading) {
    return <Skeleton visible={loading} height={100}></Skeleton>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!receiptQueryData) {
    return <>Error: Empty response</>
  }

  return (
    <Container>
      <CreateGuestModal opened={!userLoading && !user} />

      <Title order={1}>{userDetails}</Title>

      <SimpleGrid cols={2}>
        <Title order={1}>{receiptQueryData.publicReceipt.description}</Title>
        <Title order={2}>{receiptQueryData.publicReceipt.total}</Title>
      </SimpleGrid>

      <ReceiptTable receipt={receiptQueryData.publicReceipt} userID={user?.id || ""} />
    </Container>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

