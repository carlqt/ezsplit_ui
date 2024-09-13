import { useMutation } from "@apollo/client"
import { Table } from "@mantine/core"
import { FragmentType, getFragmentData, graphql } from "@src/__generated__/"
import { MeQuery, PublicReceiptDocument } from "@src/__generated__/graphql"
import { PublicReceiptTableItem } from "./-publicReceiptTableItem"

// assignMeToItem mutation
const ASSIGN_OR_REMOVE_ME = graphql(`
  mutation AssignOrRemoveMeFromItem($itemId: ID!) {
    assignOrRemoveMeFromItem(itemId: $itemId) {
      itemId
    }
  }
`)

const PublicReceiptItems = graphql(`
  fragment PublicReceiptItems on Receipt {
    items {
      id
      ...PublicReceiptItemFields
    }
  }
`)

interface ReceiptTableProps {
  data: FragmentType<typeof PublicReceiptItems>
  caption: string
  user: NonNullable<MeQuery["me"]>
}

export const ReceiptTable = ({ caption, data, user }: ReceiptTableProps) => {
  const itemsData = getFragmentData(PublicReceiptItems, data)

  const isSelected = (itemId: string): boolean => {
    return user.orders.some((o) => o.id === itemId)
  }

  const [assignOrRemove] = useMutation(ASSIGN_OR_REMOVE_ME, {
    refetchQueries: [PublicReceiptDocument],
    update: (cache, { data }) => {
      // Updating Me Orders
      cache.modify<NonNullable<MeQuery["me"]>>({
        id: cache.identify({ __typename: user.__typename, id: user?.id }),
        fields: {
          orders: (orderRefs = [], { toReference, readField }) => {
            if (!data) return

            const newOrderRef = toReference({
              __typename: "Item",
              id: data?.assignOrRemoveMeFromItem.itemId,
            })

            if (isSelected(data.assignOrRemoveMeFromItem.itemId ?? '')) {
              return orderRefs.filter((ref) => readField("id", ref) !== data.assignOrRemoveMeFromItem.itemId)
            }

            return [...orderRefs, newOrderRef]
          }
        }
      })
    }
  })

  const onSelect = (itemId: string) => {
    assignOrRemove({ variables: { itemId }})
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
        {itemsData.items.map(item => 
          <PublicReceiptTableItem 
            key={item.id}
            data={item}
            isSelected={isSelected(item.id)}
            onSelect={() => onSelect(item.id)}
          />
        )}
      </Table.Tbody>

      <Table.Caption>{caption}</Table.Caption>
    </Table>
  )
}
