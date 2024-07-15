import { Button, Container, Stack, Title } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconChevronLeft } from '@tabler/icons-react'

const Receipt = () => {
  return (
    <Container>
      <Button component="a" leftSection={<IconChevronLeft />}>
        <Link to="/receipts">Back</Link>
      </Button>

      <Stack>
        <Title order={1}>Jollibee</Title>
        <Title order={2}>Bida ang sarap</Title>
      </Stack>
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId')({
  component: Receipt
})
