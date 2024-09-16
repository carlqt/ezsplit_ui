import { ActionIcon, NumberFormatter, Table } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { useMutation } from '@apollo/client'

const ReceiptItemFields = graphql(`
  fragment ReceiptItemFields on Item {
    id
    name
    price
  }
`)

const DeleteItemMutation = graphql(`
  mutation DeleteItemFromReceipt($itemId: ID!) {
    deleteItemFromReceipt(itemId: $itemId) {
      id
    }
  } 
`)

interface ItemProps {
  data: FragmentType<typeof ReceiptItemFields>
  index: number
}

export const Item = ({ data, index }: ItemProps) => {
  const item = getFragmentData(ReceiptItemFields, data)
  const { name, price } = item
  const rowIndex = index + 1

  const [deleteItem] = useMutation(DeleteItemMutation, {
    update: (cache, { data }) => {
      if (!data?.deleteItemFromReceipt.id) return

      const cacheItem = cache.identify({ __typename: item.__typename, id: data.deleteItemFromReceipt.id })

      if (cacheItem) {
        cache.evict({ id: cacheItem })
        cache.gc()
      }
    },
    variables: { itemId: item.id },
  })

  return (
    <Table.Tr>
      <Table.Td>{rowIndex}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={price}
          thousandSeparator={true}
        />
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="transparent"
          onClick={() => void deleteItem()}
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  )
}
