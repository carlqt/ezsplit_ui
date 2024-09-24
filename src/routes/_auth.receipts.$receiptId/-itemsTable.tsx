import { Table } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { Item } from './-item'
import { FragmentType, getFragmentData } from '@src/__generated__/'
import { AddItemRow } from './-addItemRow'
import { useApolloClient } from '@apollo/client'

export const ReceiptItemList = graphql(`
  fragment ReceiptItemList on Receipt {
    items {
      id
      ...ReceiptItemFields
    }
  }
`)

interface ItemsTableProps {
  data: FragmentType<typeof ReceiptItemList>
  receiptId: string
}

export const ItemsTable = ({ data, receiptId }: ItemsTableProps) => {
  const itemsData = getFragmentData(ReceiptItemList, data)
  const { cache } = useApolloClient()
  const itemsCache = cache.identify(itemsData)

  return (
    <div className="itemsTable">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <>
            {itemsData.items.map(
              (item, index) =>
                <Item key={item.id} index={index} data={item} />,
            )}
          </>
          <>
            <AddItemRow receiptId={receiptId} itemsCache={itemsCache} />
          </>
        </Table.Tbody>
      </Table>
    </div>
  )
}
