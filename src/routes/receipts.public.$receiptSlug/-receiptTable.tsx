import { useMutation } from "@apollo/client"
import { ActionIcon, NumberFormatter, Table } from "@mantine/core"
import { graphql } from "@src/__generated__/"
import { MeDocument, PublicReceiptDocument, PublicReceiptQuery } from "@src/__generated__/graphql"
import { IconStar, IconStarFilled } from "@tabler/icons-react"

// assignMeToItem mutation
const ASSIGN_OR_REMOVE_ME = graphql(`
  mutation AssignOrRemoveMeFromItem($itemId: ID!) {
    assignOrRemoveMeFromItem(itemId: $itemId) {
      itemId
    }
  }
`)

interface ReceiptTableProps {
  receipt: PublicReceiptQuery["publicReceipt"]
  userID: string
}

type SharedBy = PublicReceiptQuery["publicReceipt"]["items"][0]["sharedBy"][0]

export const ReceiptTable = ({ receipt, userID }: ReceiptTableProps) => {
  const { items } = receipt
  const caption = `Items in ${receipt.description}`
  const [assignOrRemove] = useMutation(ASSIGN_OR_REMOVE_ME, {
    refetchQueries: [PublicReceiptDocument, MeDocument]
  })

  const rowItem = (r: PublicReceiptQuery["publicReceipt"]["items"][0]) => {
    const joinedUsernames = (users: SharedBy[]): string => {
      return users.map((u) => u.username).join(', ')
    }

    const isSelected = r.sharedBy.find((u) => u.id === userID) !== undefined

    const checkboxOnChange = () => {
      assignOrRemove({ variables: { itemId: r.id}})
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
        <Table.Td>{joinedUsernames(r.sharedBy)}</Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            onClick={checkboxOnChange}
          >
            { isSelected ? <IconStarFilled /> : <IconStar /> }
          </ActionIcon>
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
