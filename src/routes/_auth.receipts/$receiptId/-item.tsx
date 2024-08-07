import { ActionIcon, NumberFormatter, Table } from "@mantine/core"
import { ReceiptQuery } from "@src/__generated__/graphql"
import { IconTrash } from "@tabler/icons-react"

export const Item = ({ id, name, price }: ReceiptQuery["receipt"]["items"][0]) => {
  return (
    <Table.Tr>
      <Table.Td>{id}</Table.Td>
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
