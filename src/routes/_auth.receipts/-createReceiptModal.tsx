import { useMutation } from "@apollo/client"
import { Modal, Box, TextInput, Button } from "@mantine/core"
import { graphql } from "@src/__generated__/gql"
import {
  CreateMyReceiptMutation,
  CreateMyReceiptMutationVariables,
} from "@src/__generated__/graphql"
import { ChangeEvent, FormEvent, useState } from "react"

const CREATE_RECEIPT_MUTATION = graphql(`
  mutation CreateMyReceipt($input: ReceiptInput) {
    createMyReceipt(input: $input) {
      ...ReceiptFields
    }
  }
`)

interface CreateReceiptModalProps {
  opened: boolean
  close: () => void
  userId: string
}

export const CreateReceiptModal = ({
  opened,
  close,
  userId,
}: CreateReceiptModalProps) => {
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
    update: (cache, { data }) => {
      // docs at https://www.apollographql.com/docs/react/data/mutations/#the-update-function
      cache.modify({
        id: cache.identify({ __typename: "Me", id: userId }),
        fields: {
          receipts: (existingReceipts = []) => {
            return [...existingReceipts, data?.createMyReceipt]
          },
        }
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
            required
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
