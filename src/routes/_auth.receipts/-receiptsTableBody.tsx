import { Table, NumberFormatter, ActionIcon } from "@mantine/core"
import { MeWithReceiptsQuery } from "@src/__generated__/graphql"
import { IconTrash } from "@tabler/icons-react"

interface ReceiptsTableBodyProps {
  receipts: MeWithReceiptsQuery["me"]["receipts"]
}

export const ReceiptsTableBody = ({ receipts }: ReceiptsTableBodyProps) => {
  const rowItem = (r: MeWithReceiptsQuery["me"]["receipts"][0]) => {
    return (
      <Table.Tr key={r.id}>
        <Table.Td>{r.id}</Table.Td>
        <Table.Td>{r.description}</Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="$"
            value={r.total || 0}
            thousandSeparator={true}
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon variant="transparent">
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  }

  return (
    <Table.Tbody>
      { receipts.map(rowItem) }
    </Table.Tbody>
  )
}
