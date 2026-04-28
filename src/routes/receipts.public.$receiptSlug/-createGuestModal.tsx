import { useMutation } from '@apollo/client'
import { Anchor, Box, Button, Group, Modal, Stack, Text, TextInput, ThemeIcon } from '@mantine/core'
import { graphql } from '@src/__generated__'
import { MeDocument } from '@src/__generated__/graphql'
import { Link } from '@tanstack/react-router'
import { IconUserCircle } from '@tabler/icons-react'
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
    <Modal
      opened={opened}
      onClose={onClose}
      title="Join this receipt"
      centered
      radius="md"
      overlayProps={{ blur: 2 }}
    >
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <Stack gap="md">
            <Group gap="xs" align="center">
              <ThemeIcon variant="light" color="teal" radius="xl">
                <IconUserCircle size={16} />
              </ThemeIcon>
              <Text size="sm" c="dimmed">Create a temporary display name to select items.</Text>
            </Group>

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
            >
              Continue as guest
            </Button>
          </Stack>
        </form>

        <Group justify="space-between" mt="sm">
          <Link to="/login">
            <Anchor size="sm" component="button">
              Login instead
            </Anchor>
          </Link>
          <Link to="/sign_up">
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Link>
        </Group>
      </Box>
    </Modal>
  )
}
