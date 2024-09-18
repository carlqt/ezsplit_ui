import { ActionIcon, NumberFormatter, NumberInput, rem, Table, TextInput } from '@mantine/core'
import { IconTrash, IconEdit, IconDeviceFloppy, IconWriting } from '@tabler/icons-react'
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

  const [itemName, setName] = useState(name)
  const [itemPrice, setPrice] = useState(price)

  const onPriceChange = (value: string | number) => {
    setPrice(value.toString())
  }

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
      <Table.Td>
        { editMode
          ? (
              <TextInput
                required
                rightSection={<IconWriting style={{ height: rem(16) }} />}
                form="on-update"
                variant="unstyled"
                placeholder="Add name"
                onChange={(e) => { setName(e.currentTarget.value) }}
                value={itemName}
              />
            )
          : <>{itemName}</>}

      </Table.Td>
      <Table.Td>
        {
          editMode

            ? (
                <NumberInput
                  required
                  hideControls
                  rightSection={<IconWriting style={{ height: rem(16) }} />}
                  form="on-create"
                  variant="unstyled"
                  placeholder="Add price"
                  onChange={onPriceChange}
                  value={itemPrice}
                />
              )
            : (
                <NumberFormatter
                  prefix="$"
                  value={itemPrice}
                  thousandSeparator={true}
                />
              )
        }
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
