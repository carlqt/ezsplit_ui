import { useQuery } from "@apollo/client"
import { graphql } from "../src/__generated__/gql"

export const ME = graphql(`
  query Me {
    me {
      id
      username
    }
  }
`)

export const useAuth = () => {
  const { data, loading } = useQuery(ME)
  const isAuthenticated = !!data?.me.username

  return {
    isAuthenticated,
    user: data?.me.username,
    loading
  }
}
