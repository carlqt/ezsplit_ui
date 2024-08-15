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
  return (
    <div>Hello /receipts/public/$receiptSlug/!</div>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

