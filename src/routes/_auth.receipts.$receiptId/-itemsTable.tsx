import { useMutation } from "@apollo/client"
import { ActionIcon, Table, TextInput } from "@mantine/core"
import { graphql } from "@src/__generated__/gql"
import { ReceiptDocument, ReceiptQuery } from "@src/__generated__/graphql"
import { IconCirclePlus, IconDeviceFloppy } from "@tabler/icons-react"
import { useState } from "react"
import { Item } from "./-item"

const CREATE_ITEM_MUTATION = graphql(`
  mutation AddItemToReceipt($input: AddItemToReceiptInput) {
    addItemToReceipt(input: $input) {
      id
      name
      price
    }
  }
`)

interface ItemsTableProps {
  items: ReceiptQuery["receipt"]["items"]
  receiptId: string
}

export const ItemsTable = ({ items, receiptId }: ItemsTableProps) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const [addItem] = useMutation(CREATE_ITEM_MUTATION, {
    variables: { input: { receiptId, name, price: 0 } },
    onCompleted: () => {
      setName("")
      setPrice("")
    },
    update: (cache, { data }) => {
      const existingReceipt = cache.readQuery({ query: ReceiptDocument, variables: { receiptId } })

      if (!existingReceipt) return
      if (!data?.addItemToReceipt) return

      cache.writeQuery({
        query: ReceiptDocument,
        variables: { receiptId },
        data: {
          receipt: {
            ...existingReceipt.receipt,
            items: [...existingReceipt.receipt.items, data.addItemToReceipt],
          }
        }
      })
    }
  })

  const onCreate = () => {
    const inputPrice = parseFloat(price)

    addItem({
      variables: {
        input: {
          receiptId,
          name,
          price: inputPrice,
        }
      }
    })
  }

  const actionRow = () => {
    const actionIcon = (name || price) ? <IconDeviceFloppy /> : <IconCirclePlus />

    return (
      <Table.Tr>
        <Table.Td>
        </Table.Td>
        <Table.Td>
          <TextInput
            variant="unstyled"
            placeholder="Add item"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
            required
          />
        </Table.Td>
        <Table.Td>
          <TextInput
            variant="unstyled"
            placeholder="Add price"
            onChange={e => setPrice(e.currentTarget.value)}
            type="number"
            value={price}
            required
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            onClick={onCreate}
          // loading={isDeleting}
          >
            {actionIcon}
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <>
          {items.map(i => <Item key={i.id} {...i} />)}
        </>
        <>
          {actionRow()}
        </>
      </Table.Tbody>
    </Table>
  )
}
