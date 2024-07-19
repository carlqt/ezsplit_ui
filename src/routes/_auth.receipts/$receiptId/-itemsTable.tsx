import { ActionIcon, NumberFormatter, Table, TextInput } from "@mantine/core"
import { ReceiptQuery } from "@src/__generated__/graphql"
import { IconCirclePlus, IconDeviceFloppy, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

interface ItemsTableProps {
  items: ReceiptQuery["receipt"]["items"]
}

export const ItemsTable = ({ items }: ItemsTableProps) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const actionRow = () => {
    const actionIcon = (name || price) ? <IconDeviceFloppy /> : <IconCirclePlus />

    return (
      // setting the key as 'static' is a hack to prevent the warning: "Warning: Each child in a list should have a unique "key" prop."
      // It's not really needed to set a key for this row, since it's an ephemeral row that doesn't have an id and it's just used for
      // adding items
      <Table.Tr key={'static'}>
        <Table.Td>
        </Table.Td>
        <Table.Td>
          <TextInput
            variant="unstyled"
            placeholder="Add item"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
            required
          />
        </Table.Td>
        <Table.Td>
          <TextInput
            variant="unstyled"
            placeholder="Add price"
            onChange={e => setPrice(e.currentTarget.value)}
            type="number"
            value={price}
            required
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
          // onClick={() => onDelete(r.id)}
          // loading={isDeleting}
          >
            {actionIcon}
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  }

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
          <ActionIcon
            variant="transparent"
          >
            <IconTrash />
          </ActionIcon>
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

      <Table.Tbody>{items.map(i => tableItems(i)).concat([actionRow()])}</Table.Tbody>
    </Table>
  )
}
