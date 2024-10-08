import { ActionIcon, NumberFormatter, Table } from '@mantine/core'
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
}

export const ReceiptItem = ({ data, onClick, index }: Props) => {
  const r = getFragmentData(ReceiptFields, data)
  const rowIndex = index + 1

  return (
    <Table.Tr>
      <Table.Td>{rowIndex}</Table.Td>
      <Table.Td>
        <Link to="/receipts/$receiptId" params={{ receiptId: r.id }}>{r.description}</Link>
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={r.total || 0}
          thousandSeparator={true}
        />
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="transparent"
          onClick={onClick}
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  )
}
