import { useMutation } from '@apollo/client'
import { Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { graphql } from '@src/__generated__/gql'
import {
  DeleteMyReceiptMutation,
  DeleteMyReceiptMutationVariables,
  ReceiptsOnMeFragment,
} from '@src/__generated__/graphql'
import { ReceiptItem } from './-receiptItem'

const DELETE_RECEIPT_MUTATION = graphql(`
  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {
    deleteMyReceipt(input: $input)
  }
`)

const ReceiptsOnMe = graphql(`
  fragment ReceiptsOnMe on Me {
    receipts {
      id
      ...ReceiptFields
    }
  }
`)

interface ReceiptsTableBodyProps {
  data: FragmentType<typeof ReceiptsOnMe>
}

export const ReceiptsTableBody = ({ data }: ReceiptsTableBodyProps) => {
  const receiptsData = getFragmentData(ReceiptsOnMe, data)
  const { receipts } = receiptsData

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { open: startLoading, close: stopLoading }]
    = useDisclosure()

  const [deleteReceipt] = useMutation<
    DeleteMyReceiptMutation,
    DeleteMyReceiptMutationVariables
  >(DELETE_RECEIPT_MUTATION, {
    onCompleted: () => {
      stopLoading()
    },
    update: (cache, { data }) => {
      // Not sure if "ReceiptsOnMeFragment" is the correct type here but it stopped the linter from complaining
      cache.modify<ReceiptsOnMeFragment>({
        fields: {
          receipts: (existingReceipts = [], { readField }) => {
            return existingReceipts.filter(receiptRef => readField('id', receiptRef) !== data?.deleteMyReceipt)
          },
        },
        id: cache.identify(receiptsData),
      })
    },
  })

  const onDelete = (id: string) => {
    startLoading()
    void deleteReceipt({ variables: { input: { id } } })
  }

  return (
    <Table.Tbody>
      {receipts.map((r, i) => (
        <ReceiptItem
          index={i}
          key={r.id}
          onClick={() => { onDelete(r.id) }}
          data={r}
        />
      ),
      )}
    </Table.Tbody>
  )
}
