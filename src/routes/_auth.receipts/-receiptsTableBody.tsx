import { TypedDocumentNode, useMutation } from "@apollo/client"
import { Table, NumberFormatter, ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { graphql } from "@src/__generated__/gql"
import {
  DeleteMyReceiptMutation,
  DeleteMyReceiptMutationVariables,
  MeWithReceiptsQuery,
  MeWithReceiptsQueryVariables,
} from "@src/__generated__/graphql"
import { IconTrash } from "@tabler/icons-react"

interface ReceiptsTableBodyProps {
  receipts: MeWithReceiptsQuery["me"]["receipts"]
  RECEIPTS_QUERY: TypedDocumentNode<
    MeWithReceiptsQuery,
    MeWithReceiptsQueryVariables
  >
}

const DELETE_RECEIPT_MUTATION = graphql(`
  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {
    deleteMyReceipt(input: $input)
  }
`)

export const ReceiptsTableBody = ({
  receipts,
  RECEIPTS_QUERY,
}: ReceiptsTableBodyProps) => {
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
      const allReceipts = cache.readQuery({ query: RECEIPTS_QUERY })

      if (allReceipts === null) return

      const updatedReceipts = allReceipts?.me.receipts.filter(
        (t) => t.id != data?.deleteMyReceipt
      )

      cache.writeQuery({
        query: RECEIPTS_QUERY,
        data: { me: { ...allReceipts.me, receipts: updatedReceipts } },
      })
    },
  })

  const onDelete = (id: string) => {
    startLoading()
    deleteReceipt({ variables: { input: { id } }})
  }

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
