import { ActionIcon, NumberFormatter, Table } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { graphql } from "@src/__generated__/gql";
import { FragmentType, getFragmentData } from "@src/__generated__";

export const ReceiptItemFields = graphql(`
  fragment ReceiptItemFields on Item {
    name
    price
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

  return (
    <Table.Tr>
      <Table.Td>{rowIndex}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={price || 0}
          thousandSeparator={true}
        />
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="transparent"
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  )
}
