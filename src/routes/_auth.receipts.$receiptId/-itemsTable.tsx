import { useMutation } from "@apollo/client"
import { ActionIcon, Table, TextInput } from "@mantine/core"
import { graphql } from "@src/__generated__/gql"
import { ReceiptDocument } from "@src/__generated__/graphql"
import { IconCirclePlus, IconDeviceFloppy } from "@tabler/icons-react"
import { useState } from "react"
import { Item } from "./-item"
import { FragmentType, getFragmentData } from "@src/__generated__/"

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
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const [addItem] = useMutation(CREATE_ITEM_MUTATION, {
    variables: { input: { receiptId, name, price: 0 } },
    onCompleted: () => {
      setName("")
      setPrice("")
    },
    refetchQueries: [ReceiptDocument]
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
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <>
          {itemsData.items.map(i => <Item key={i.id} data={i} />)}
        </>
        <>
          {actionRow()}
        </>
      </Table.Tbody>
    </Table>
  )
}
