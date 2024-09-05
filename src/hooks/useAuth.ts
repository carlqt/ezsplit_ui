import { useQuery } from "@apollo/client";
import { graphql } from "@src/__generated__/gql";
import { UserState } from "@src/__generated__/graphql";

export const ME = graphql(`
  query Me {
    me {
      id
      username
      state
      totalPayables
    }
  }
`);

// TODO: Check state. If verified, then it is authenticated
export const useAuth = () => {
  const { data, loading } = useQuery(ME);
  const isAuthenticated = data?.me?.state == UserState.Verified;

  return {
    isAuthenticated,
    user: data?.me,
    loading,
  };
};
