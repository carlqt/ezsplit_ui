import { useMutation } from "@apollo/client"
import { Modal, Box, TextInput, Button, Flex, Anchor } from "@mantine/core"
import { graphql } from "@src/__generated__"
import { MeDocument } from "@src/__generated__/graphql"
import { Link } from "@tanstack/react-router"
import { FormEvent, useState } from "react"

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
  close: () => void
}

export const CreateGuestModal = ({
  opened,
  close,
}: ModalProps) => {
  const [name, setName] = useState("")
  const [createGuestUser] = useMutation(GUEST_USER_MUTATION, {
    refetchQueries: [MeDocument],
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    createGuestUser({variables: { input: { username: name }}})
  }
  // On create click, call mutation

  return (
    <Modal opened={opened} onClose={close} title="Create a display name" centered>
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Display name"
            name="username"
            placeholder="Enter your display name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <Button
            loaderProps={{ type: "bars" }}
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
