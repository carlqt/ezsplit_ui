import { createFileRoute } from '@tanstack/react-router'
import { PublicReceiptPage } from './-publicReceiptPage'

export const Route = createFileRoute('/receipts/public/$receiptSlug/')({
  component: PublicReceiptPage,
})
