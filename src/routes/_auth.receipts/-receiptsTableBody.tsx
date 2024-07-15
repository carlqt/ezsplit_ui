import { useMutation } from "@apollo/client"
import { Table, NumberFormatter, ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { graphql } from "@src/__generated__/gql"
import {
  DeleteMyReceiptMutation,
  DeleteMyReceiptMutationVariables,
  MeWithReceiptsQuery,
} from "@src/__generated__/graphql"
import { IconTrash } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"

interface ReceiptsTableBodyProps {
  receipts: MeWithReceiptsQuery["me"]["receipts"]
}

const DELETE_RECEIPT_MUTATION = graphql(`
  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {
    deleteMyReceipt(input: $input)
  }
`)

export const ReceiptsTableBody = ({ receipts }: ReceiptsTableBodyProps) => {
  const [isDeleting, { open: startLoading, close: stopLoading }] =
    useDisclosure()
  const [deleteReceipt] = useMutation<
    DeleteMyReceiptMutation,
    DeleteMyReceiptMutationVariables
  >(DELETE_RECEIPT_MUTATION, {
    onCompleted: async () => {
      stopLoading()
    },
    update: (cache, { data }) => {
      cache.evict({
        id: cache.identify({
          __typename: "Receipt",
          id: data?.deleteMyReceipt,
        }),
      })

      cache.gc()
    },
  })

  const onDelete = (id: string) => {
    startLoading()
    deleteReceipt({ variables: { input: { id } } })
  }

  const rowItem = (r: MeWithReceiptsQuery["me"]["receipts"][0]) => {
    return (
      <Table.Tr key={r.id}>
        <Table.Td>{r.id}</Table.Td>
        <Table.Td>
          <Link to={`/receipts/$receiptId`} params={{ receiptId: r.id }}>{r.description}</Link>
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="$"
            value={r.total || 0}
            thousandSeparator={true}
          />
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            onClick={() => onDelete(r.id)}
            loading={isDeleting}
          >
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  }

  return <Table.Tbody>{receipts.map(rowItem)}</Table.Tbody>
}
