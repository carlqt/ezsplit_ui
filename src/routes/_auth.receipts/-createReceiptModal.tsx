import { useMutation } from '@apollo/client'
import { Box, Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { graphql } from '@src/__generated__/gql'
import {
  CreateMyReceiptMutation,
  CreateMyReceiptMutationVariables,
  ReceiptsOnMeFragment,
} from '@src/__generated__/graphql'
import { FormEvent, useState } from 'react'

const CREATE_RECEIPT_MUTATION = graphql(`
  mutation CreateMyReceipt($input: ReceiptInput) {
    createMyReceipt(input: $input) {
      id
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
  const [total, setTotal] = useState('0')
  const [description, setDescription] = useState('')

  const onTotalChange = (value: string | number) => {
    setTotal(value.toString())
  }

  // TODO: Error handling
  const [createReceipt, { loading }] = useMutation<
    CreateMyReceiptMutation,
    CreateMyReceiptMutationVariables
  >(CREATE_RECEIPT_MUTATION, {
    onCompleted: () => {
      setTotal('0')
      setDescription('')
      close()
    },
    update: (cache, { data }) => {
      // docs at https://www.apollographql.com/docs/react/data/mutations/#the-update-function
      cache.modify<ReceiptsOnMeFragment>({
        fields: {
          receipts: (existingReceipts = [], { toReference }) => {
            const newReceiptRef = toReference({ __typename: data?.createMyReceipt.__typename, id: data?.createMyReceipt.id })

            return [...existingReceipts, newReceiptRef]
          },
        },
        id: cache.identify({ __typename: 'Me', id: userId }),
      })
    },
  })

  const onSubmit = (e: FormEvent) => {
    const floatTotal = parseFloat(total) || 0

    e.preventDefault()
    void createReceipt({
      variables: {
        input: { description, total: floatTotal },
      },
    })
  }

  return (
    <Modal opened={opened} onClose={close} title="Create Receipt" centered>
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <TextInput
            required
            data-autofocus
            label="Description"
            name="description"
            onChange={(e) => { setDescription(e.target.value) }}
            value={description}
          />
          <NumberInput
            label="Total"
            mt="md"
            name="total"
            onChange={onTotalChange}
            value={total}
          />
          <Button
            loading={loading}
            loaderProps={{ type: 'bars' }}
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
