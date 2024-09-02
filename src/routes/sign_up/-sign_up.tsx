import { FormEvent, useState } from "react"
import { graphql } from "@src/__generated__/gql"
import { useMutation } from "@apollo/client"
import { Link, useRouter } from "@tanstack/react-router"
import { ME } from "@src/hooks/useAuth"
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  MeQuery,
  UserState,
} from "@src/__generated__/graphql"
import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core"

const CREATE_USER = graphql(`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
      username
    }
  }
`)

export const SignupForm = () => {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [createUser, { error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    variables: { input: { username, password, confirmPassword } },
    onCompleted: async () => {
      await router.invalidate()
      router.history.push("/dashboard")
    },
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<MeQuery>({
          query: ME,
          data: { me: { ...data.createUser, __typename: "Me", state: UserState.Verified } },
        })
      }
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    createUser()
  }

  if (error) {
    return <>Lol Error: {error}</>
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Username"
            placeholder="john_smith"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="confirm password"
            required
            mt="md"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
