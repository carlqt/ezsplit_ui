import { Button, Container } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconChevronLeft } from '@tabler/icons-react'

const Receipt = () => {
  return (
    <Container>
      <Button component="a" leftSection={<IconChevronLeft />}>
        <Link to="/receipts">Back</Link>
      </Button>

      <h1>Hello World</h1>
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId')({
  component: Receipt
})
