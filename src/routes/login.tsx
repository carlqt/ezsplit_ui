import { Link, createFileRoute, useRouter } from "@tanstack/react-router"
import { graphql } from "@src/__generated__/gql"
import { FormEvent, useState } from "react"
import { useMutation } from "@apollo/client"
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  MeQuery,
} from "@src/__generated__/graphql"
import { ME } from "@src/useAuth"
import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core"

const LOGIN_USER = graphql(`
  mutation LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      id
      username
    }
  }
`)

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, { error }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER, {
    variables: { input: { username, password } },
    onCompleted: async () => {
      await router.invalidate()
      router.history.push("/")
    },
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<MeQuery>({
          query: ME,
          data: { me: { ...data.loginUser, __typename: "Me" } },
        })
      }
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    login()
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to="/sign_up">
          <Anchor size="sm" component="button">
            Create account
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
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
