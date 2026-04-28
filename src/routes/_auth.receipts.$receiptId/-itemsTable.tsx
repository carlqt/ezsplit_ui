import { Paper, Table } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { Item } from './-item'
import { FragmentType, getFragmentData } from '@src/__generated__/'
import { AddItemRow } from './-addItemRow'
import { useApolloClient } from '@apollo/client'

const ReceiptItemList = graphql(`
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
    <Paper withBorder radius="md" p="md">
      <Table.ScrollContainer minWidth={720}>
        <Table highlightOnHover striped verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Item</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Price</Table.Th>
              <Table.Th style={{ width: 110 }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {itemsData.items.map((item, index) => (
              <Item key={item.id} index={index} data={item} />
            ))}
            <AddItemRow receiptId={receiptId} itemsCache={itemsCache} />
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
