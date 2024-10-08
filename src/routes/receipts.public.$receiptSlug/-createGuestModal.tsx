import { useMutation } from '@apollo/client'
import { Anchor, Box, Button, Flex, Modal, TextInput } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { MeDocument } from '@src/__generated__/graphql'
import { Link } from '@tanstack/react-router'
import { FormEvent, useState } from 'react'

const GUEST_USER_MUTATION = graphql(`
  mutation CreateGuestUser($input: CreateGuestUserInput!) {
    createGuestUser(input: $input) {
      id
      username
      state
    }
  }
`)

interface ModalProps {
  opened: boolean
}

export const CreateGuestModal = ({
  opened,
}: ModalProps) => {
  const [name, setName] = useState('')
  const [createGuestUser] = useMutation(GUEST_USER_MUTATION, {
    refetchQueries: [MeDocument],
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void createGuestUser({ variables: { input: { username: name } } })
  }

  // On close is just to satisfy the Modal component
  const onClose = (): void => undefined

  // On create click, call mutation
  return (
    <Modal opened={opened} onClose={onClose} title="Create a display name" centered>
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <TextInput
            required
            data-autofocus
            label="Display name"
            name="username"
            placeholder="Enter your display name"
            value={name}
            onChange={(e) => { setName(e.currentTarget.value) }}
          />
          <Button
            loaderProps={{ type: 'bars' }}
            type="submit"
            fullWidth
            mt="xl"
          >
            Create
          </Button>
        </form>
        <Flex justify="space-between">
          <Link to="/login">
            <Anchor size="sm" component="button">
              Login
            </Anchor>
          </Link>
          <Link to="/sign_up">
            <Anchor size="sm" component="button">
              Sign up
            </Anchor>
          </Link>
        </Flex>
      </Box>
    </Modal>
  )
}
