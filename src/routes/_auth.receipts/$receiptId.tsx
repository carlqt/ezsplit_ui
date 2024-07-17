import { Button, Container, Space, Stack, Table, TableData, Title } from '@mantine/core'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IconChevronLeft } from '@tabler/icons-react'

const Receipt = () => {
  const tableData: TableData = {
    caption: 'Receipt line items',
    head: ['Name', 'Price'],
    body: [
      ['Chickenjoy', '$5.00'],
      ['Jolly Spaghetti', '$3.00'],
      ['Peach Mango Pie', '$2.00'],
    ],
  }

  return (
    <Container>
      <Button component="a" leftSection={<IconChevronLeft />}>
        <Link to="/receipts">Back</Link>
      </Button>
      <Space h="md" />

      <Stack>
        <Title order={1}>Jollibee</Title>
        <Title order={2}>Bida ang sarap</Title>
      </Stack>

      <Table data={tableData} />
    </Container>
  )
}

export const Route = createFileRoute('/_auth/receipts/$receiptId')({
  component: Receipt
})
