import { useQuery } from '@apollo/client'
import { Container, Skeleton, Title } from '@mantine/core'
import { graphql } from '@src/__generated__'
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

  return (
    <Container>
      <Title order={1}>{data.publicReceipt.description}</Title>
      <Title order={2}>{data.publicReceipt.total}</Title>
      <div> Hello / receipts / public / $receiptSlug / !</div >
    </Container>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

