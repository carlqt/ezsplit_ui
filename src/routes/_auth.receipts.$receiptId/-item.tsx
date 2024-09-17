import { ActionIcon, NumberFormatter, Table } from '@mantine/core'
import { IconTrash, IconEdit, IconDeviceFloppy } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { useMutation } from '@apollo/client'
import { Dispatch, SetStateAction, useState } from 'react'

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

// Tried using ComponentProps but can't inherit props from ActionIcon
const EditActionIcon = (props: { editMode: boolean, setEditMode: Dispatch<SetStateAction<boolean>> }) => {
  const { editMode, setEditMode } = props

  if (editMode) {
    return (
      <ActionIcon
        onClick={() => { setEditMode(false) }}
        variant="transparent"
      >
        <IconDeviceFloppy />
      </ActionIcon>
    )
  }

  return (
    <ActionIcon
      onClick={() => { setEditMode(true) }}
      variant="transparent"
    >
      <IconEdit />
    </ActionIcon>
  )
}

export const Item = ({ data, index }: ItemProps) => {
  const item = getFragmentData(ReceiptItemFields, data)
  const { name, price } = item
  const rowIndex = index + 1

  const [editMode, setEditMode] = useState(false)

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
        <EditActionIcon setEditMode={setEditMode} editMode={editMode} />

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
