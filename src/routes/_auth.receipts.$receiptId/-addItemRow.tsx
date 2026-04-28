import { useMutation } from '@apollo/client'
import { ActionIcon, Badge, FocusTrap, NumberInput, Table, TextInput, Tooltip } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import { ReceiptItemListFragment } from '@src/__generated__/graphql'
import { IconCirclePlus, IconDeviceFloppy } from '@tabler/icons-react'
import { useCallback, useRef, useState } from 'react'

const CREATE_ITEM_MUTATION = graphql(`
  mutation AddItemToReceipt($input: AddItemToReceiptInput) {
    addItemToReceipt(input: $input) {
      id
      ...ReceiptItemFields
    }
  }
`)

interface Props {
  receiptId: string
  itemsCache?: string
}

export const AddItemRow = ({ receiptId, itemsCache }: Props) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const actionIcon = (name || price) ? <IconDeviceFloppy size={16} /> : <IconCirclePlus size={16} />

  const priceInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

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
        id: itemsCache,
      })
    },
  })

  const onCreate = useCallback(() => {
    if (!nameInputRef.current?.reportValidity()) return
    if (!priceInputRef.current?.reportValidity()) return

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
  }, [addItem, name, price, receiptId])

  const onPriceChange = (value: string | number) => {
    setPrice(value.toString())
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onCreate()
  }, [onCreate])

  return (
    <FocusTrap active>
      <Table.Tr>
        <Table.Td>
          <Badge variant="light" color="teal">+</Badge>
        </Table.Td>
        <Table.Td>
          <TextInput
            required
            data-autofocus
            ref={nameInputRef}
            variant="unstyled"
            placeholder="Add item"
            onChange={(e) => { setName(e.currentTarget.value) }}
            value={name}
            onKeyDown={handleKeyDown}
          />
        </Table.Td>

        <Table.Td>
          <NumberInput
            required
            hideControls
            ref={priceInputRef}
            form="on-create"
            variant="unstyled"
            placeholder="Add price"
            onChange={onPriceChange}
            value={price}
            decimalScale={2}
            onKeyDown={handleKeyDown}
          />
        </Table.Td>

        <Table.Td>
          <Tooltip label={(name || price) ? 'Save item' : 'Add item'}>
            <ActionIcon
              variant="subtle"
              color="teal"
              type="submit"
              onClick={onCreate}
              aria-label="Add item"
            >
              {actionIcon}
            </ActionIcon>
          </Tooltip>
        </Table.Td>
      </Table.Tr>
    </FocusTrap>
  )
}
