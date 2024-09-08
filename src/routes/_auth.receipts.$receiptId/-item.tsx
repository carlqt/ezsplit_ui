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
}


export const Item = ({ data }: ItemProps) => {
  const item = getFragmentData(ReceiptItemFields, data)
  const { name, price } = item

  return (
    <Table.Tr>
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
