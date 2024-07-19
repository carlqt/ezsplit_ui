import { NumberFormatter, Table } from "@mantine/core"
import { ReceiptQuery } from "@src/__generated__/graphql"

interface ItemsTableProps {
  items: ReceiptQuery["receipt"]["items"]
}

export const ItemsTable = ({ items }: ItemsTableProps) => {
  const tableItems = (i: ReceiptQuery["receipt"]["items"][0]) => {
    return (
      <Table.Tr key={i.id}>
        <Table.Td>{i.id}</Table.Td>
        <Table.Td>{i.name}</Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="$"
            value={i.price || 0}
            thousandSeparator={true}
          />
        </Table.Td>
        <Table.Td>
          placeholder
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>{items.map(i => tableItems(i))}</Table.Tbody>
    </Table>
  )
}
