import { useMutation } from '@apollo/client'
import { Center, Stack, Table, Text } from '@mantine/core'
import { FragmentType, getFragmentData } from '@src/__generated__'
import { graphql } from '@src/__generated__/gql'
import { useState } from 'react'
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
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [deleteReceipt] = useMutation<
    DeleteMyReceiptMutation,
    DeleteMyReceiptMutationVariables
  >(DELETE_RECEIPT_MUTATION, {
    onCompleted: () => {
      setDeletingId(null)
    },
    onError: () => {
      setDeletingId(null)
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
    setDeletingId(id)
    void deleteReceipt({ variables: { input: { id } } })
  }

  if (receipts.length === 0) {
    return (
      <Table.Tbody>
        <Table.Tr>
          <Table.Td colSpan={4}>
            <Center py="xl">
              <Stack gap={2} align="center">
                <Text fw={600}>No receipts yet</Text>
                <Text size="sm" c="dimmed">Create your first receipt to get started.</Text>
              </Stack>
            </Center>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    )
  }

  return (
    <Table.Tbody>
      {receipts.map((r, i) => (
        <ReceiptItem
          index={i}
          key={r.id}
          onClick={() => { onDelete(r.id) }}
          data={r}
          isDeleting={deletingId === r.id}
        />
      ),
      )}
    </Table.Tbody>
  )
}
