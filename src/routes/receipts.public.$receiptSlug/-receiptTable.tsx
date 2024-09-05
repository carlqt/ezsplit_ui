import { Checkbox, NumberFormatter, Table } from "@mantine/core"
import { graphql } from "@src/__generated__/graphql"
import { PublicReceiptQuery } from "@src/__generated__/graphql"

// assignMeToItem mutation
const ASSIGN_ME_TO_ITEM = graphql(`
  mutation AssignMeToItem($input: AssignOrDeleteMeToItemInput) {
    assignMeToItem(input: $input) {
      id
      name
      price
      sharedBy {
        id
        username
      }
    }
  }
`)

// removeMeFromItem mutation
const REMOVE_ME_FROM_ITEM = graphql(`
  mutation RemoveMeFromItem($input: AssignOrDeleteMeToItemInput) {
    removeMeFromItem(input: $input) {
      id
    }
  }
`)

interface ReceiptTableProps {
  receipt: PublicReceiptQuery["publicReceipt"]
}

type SharedBy = PublicReceiptQuery["publicReceipt"]["items"][0]["sharedBy"][0]

export const ReceiptTable = ({ receipt }: ReceiptTableProps) => {
  const { items } = receipt
  const caption = `Items in ${receipt.description}`

  const rowItem = (r: PublicReceiptQuery["publicReceipt"]["items"][0]) => {
    const joinedUsernames = (users: SharedBy[]): string => {
      return users.map((u) => u.username).join(', ')
    }

    return (
      <Table.Tr key={r.id}>
        <Table.Td>{r.id}</Table.Td>
        <Table.Td>
          {r.name}
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="$"
            value={r.price || 0}
            thousandSeparator={true}
          />
        </Table.Td>
        <Table.Td>{ joinedUsernames(r.sharedBy) }</Table.Td>
        <Table.Td>
          <Checkbox size="md" />
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Shared By</Table.Th>
          <Table.Th>Select</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {items.map(rowItem)}
      </Table.Tbody>

      <Table.Caption>{caption}</Table.Caption>
    </Table>
  )
}
