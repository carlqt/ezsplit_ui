import { createFileRoute } from '@tanstack/react-router'

const PublicReceipt = () => {
  return (
    <div>Hello /receipts/public/$receiptSlug/!</div>
  )
}

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceipt,
})

