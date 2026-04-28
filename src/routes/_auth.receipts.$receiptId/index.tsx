import { createFileRoute } from '@tanstack/react-router'
import { ReceiptPage } from './-receiptPage'

export const Route = createFileRoute('/_auth/receipts/$receiptId/')({
  component: ReceiptPage,
})
