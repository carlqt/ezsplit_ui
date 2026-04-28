import { ActionIcon, Badge, NumberFormatter, Stack, Table, Text, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { graphql } from '@src/__generated__/gql'

const ReceiptFields = graphql(`
  fragment ReceiptFields on Receipt {
    id
    description
    total
  }
`)

interface Props {
  data: FragmentType<typeof ReceiptFields>
  onClick: () => void
  index: number
  isDeleting?: boolean
}

export const ReceiptItem = ({ data, onClick, index, isDeleting = false }: Props) => {
  const r = getFragmentData(ReceiptFields, data)
  const rowIndex = index + 1
  const description = r.description.trim() || 'Untitled receipt'
  const total = r.total
  const shortId = r.id.slice(0, 8)

  return (
    <Table.Tr>
      <Table.Td>
        <Badge variant="light" color="gray">{rowIndex}</Badge>
      </Table.Td>
      <Table.Td>
        <Link
          to="/receipts/$receiptId"
          params={{ receiptId: r.id }}
          style={{ textDecoration: 'none' }}
        >
          <Stack gap={2}>
            <Text fw={600} c="teal.8">{description}</Text>
            <Text size="xs" c="dimmed">{'ID: ' + shortId}</Text>
          </Stack>
        </Link>
      </Table.Td>
      <Table.Td>
        <Text fw={700} ta="right">
          <NumberFormatter
            prefix="$"
            value={total}
            thousandSeparator
          />
        </Text>
      </Table.Td>
      <Table.Td>
        <Tooltip label={isDeleting ? 'Deleting...' : 'Delete receipt'}>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={onClick}
            aria-label="Delete receipt"
            disabled={isDeleting}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  )
}
