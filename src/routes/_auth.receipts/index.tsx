import { createFileRoute } from '@tanstack/react-router'
import { ReceiptsPage } from './-receiptsPage'

export const Route = createFileRoute('/_auth/receipts/')({
  component: ReceiptsPage,
})
