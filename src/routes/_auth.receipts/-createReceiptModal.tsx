import { TypedDocumentNode, useMutation } from "@apollo/client"
import { Modal, Box, TextInput, Button } from "@mantine/core"
import { graphql } from "@src/__generated__/gql"
import {
  CreateMyReceiptMutation,
  CreateMyReceiptMutationVariables,
  MeWithReceiptsQuery,
  MeWithReceiptsQueryVariables,
} from "@src/__generated__/graphql"
import { ChangeEvent, FormEvent, useState } from "react"

const CREATE_RECEIPT_MUTATION = graphql(`
  mutation CreateMyReceipt($input: ReceiptInput) {
    createMyReceipt(input: $input) {
      id
      total
      description
    }
  }
`)

interface CreateReceiptModalProps {
  opened: boolean
  close: () => void
  RECEIPTS_QUERY: TypedDocumentNode<
    MeWithReceiptsQuery,
    MeWithReceiptsQueryVariables
  >
}

export function CreateReceiptModal({
  opened,
  close,
  RECEIPTS_QUERY,
}: CreateReceiptModalProps) {
  const [total, setTotal] = useState(0)
  const [description, setDescription] = useState("")

  const onTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const floatTotal = parseFloat(e.target.value)

    setTotal(floatTotal)
  }

  // TODO: Error handling
  const [createReceipt, { loading }] = useMutation<
    CreateMyReceiptMutation,
    CreateMyReceiptMutationVariables
  >(CREATE_RECEIPT_MUTATION, {
    variables: { input: { total, description } },
    onCompleted: async () => {
      setTotal(0)
      setDescription("")
      close()
    },
    update(cache, { data }) {
      const existingReceipts = cache.readQuery({ query: RECEIPTS_QUERY })
      if (!existingReceipts) return
      if (!data?.createMyReceipt) return

      const updatedReceipts = [
        ...existingReceipts.me.receipts,
        data.createMyReceipt,
      ]

      cache.writeQuery({
        query: RECEIPTS_QUERY,
        data: { me: { ...existingReceipts.me, receipts: updatedReceipts } },
      })
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    createReceipt()
  }

  return (
    <Modal opened={opened} onClose={close} title="Create Receipt" centered>
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextInput
            label="Total"
            mt="md"
            name="total"
            type="number"
            onChange={onTotalChange}
            value={total}
          />

          <Button
            loading={loading}
            loaderProps={{ type: "bars" }}
            type="submit"
            fullWidth
            mt="xl"
          >
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
