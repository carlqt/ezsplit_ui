import { useMutation } from '@apollo/client'
import { ActionIcon, FocusTrap, NumberInput, Table, TextInput } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { ReceiptItemListFragment } from '@src/__generated__/graphql'
import { IconCirclePlus, IconDeviceFloppy } from '@tabler/icons-react'
import { FormEvent, useState } from 'react'
import { Item } from './-item'
import { FragmentType, getFragmentData } from '@src/__generated__/'

const CREATE_ITEM_MUTATION = graphql(`
  mutation AddItemToReceipt($input: AddItemToReceiptInput) {
    addItemToReceipt(input: $input) {
      id
      ...ReceiptItemFields
    }
  }
`)

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
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const [addItem] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      setName('')
      setPrice('')
    },
    update: (cache, { data }) => {
      if (!data?.addItemToReceipt) return

      cache.modify<ReceiptItemListFragment>({
        fields: {
          items: (itemsRef = [], { toReference }) => {
            const newItemRef = toReference(data.addItemToReceipt)

            return [...itemsRef, newItemRef]
          },
        },
        id: cache.identify(itemsData),
      })
    },
    variables: { input: { name, price: 0, receiptId } },
  })

  const onCreate = (e: FormEvent) => {
    e.preventDefault()

    const inputPrice = parseFloat(price)

    void addItem({
      variables: {
        input: {
          name,
          price: inputPrice,
          receiptId,
        },
      },
    })
  }

  const onPriceChange = (value: string | number) => {
    setPrice(value.toString())
  }

  const actionRow = () => {
    const actionIcon = (name || price) ? <IconDeviceFloppy /> : <IconCirclePlus />

    return (
      <FocusTrap active>
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td>
            <TextInput
              required
              data-autofocus
              variant="unstyled"
              placeholder="Add item"
              onChange={(e) => { setName(e.currentTarget.value) }}
              value={name}
            />
          </Table.Td>

          <Table.Td>
            <NumberInput
              required
              hideControls
              variant="unstyled"
              placeholder="Add price"
              onChange={onPriceChange}
              value={price}
            />
          </Table.Td>

          <Table.Td>
            <ActionIcon
              variant="transparent"
              type="submit"
            >
              {actionIcon}
            </ActionIcon>
          </Table.Td>
        </Table.Tr>
      </FocusTrap>
    )
  }

  return (
    <form onSubmit={onCreate}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <>
            {itemsData.items.map((item, index) => <Item key={item.id} index={index} data={item} />)}
          </>
          <>
            {actionRow()}
          </>
        </Table.Tbody>
      </Table>
    </form>
  )
}
