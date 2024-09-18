import { ActionIcon, NumberFormatter, NumberInput, rem, Table, TextInput } from '@mantine/core'
import { IconTrash, IconEdit, IconDeviceFloppy, IconWriting } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { useMutation } from '@apollo/client'
import { useRef, useState } from 'react'
import { ReceiptDocument } from '@src/__generated__/graphql'

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

const UpdateItemMutation = graphql(`
  mutation UpdateItemFromReceipt($input: UpdateItemToReceiptInput) {
    updateItemFromReceipt(input: $input) {
      id
      name
      price
    }
  }
`)

interface ItemProps {
  data: FragmentType<typeof ReceiptItemFields>
  index: number
}

export const Item = ({ data, index }: ItemProps) => {
  const item = getFragmentData(ReceiptItemFields, data)
  const { name, price, id } = item
  const rowIndex = index + 1

  const [itemName, setName] = useState(name)
  const [itemPrice, setPrice] = useState(price)

  const priceInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

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
    variables: { itemId: id },
  })

  // TODO: Use ref to trigger checkValidity
  const [updateItem] = useMutation(UpdateItemMutation, {
    refetchQueries: [ReceiptDocument],
  })

  const onUpdateItem = () => {
    if (!priceInputRef.current?.reportValidity()) return
    if (!nameInputRef.current?.reportValidity()) return

    const floatPrice = parseFloat(itemPrice)

    setEditMode(false)

    void updateItem({
      variables: {
        input: {
          itemId: id,
          name: itemName,
          price: floatPrice,
        },
      },
    })
  }

  return (
    <Table.Tr>
      <Table.Td>{rowIndex}</Table.Td>
      <Table.Td>
        {
          editMode
            ? (
                <TextInput
                  required
                  rightSection={<IconWriting style={{ height: rem(16) }} />}
                  ref={nameInputRef}
                  variant="unstyled"
                  placeholder="Add name"
                  onChange={(e) => { setName(e.currentTarget.value) }}
                  value={itemName}
                />
              )
            : <>{itemName}</>
        }

      </Table.Td>
      <Table.Td>
        {
          editMode

            ? (
                <NumberInput
                  required
                  hideControls
                  ref={priceInputRef}
                  rightSection={<IconWriting style={{ height: rem(16) }} />}
                  form="on-update"
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
        {
          editMode
            ? (
                <ActionIcon
                  onClick={onUpdateItem}
                  variant="transparent"
                >
                  <IconDeviceFloppy />
                </ActionIcon>

              )
            : (
                <ActionIcon
                  onClick={() => { setEditMode(true) }}
                  type="submit"
                  form="on-update"
                  variant="transparent"
                >
                  <IconEdit />
                </ActionIcon>

              )
        }

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
