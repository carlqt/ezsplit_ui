import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;

export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AddItemToReceiptDocument = gql`
    mutation AddItemToReceipt($input: AddItemToReceiptInput) {
  addItemToReceipt(input: $input) {
    id
    name
    price
  }
}
    `;
export type AddItemToReceiptMutationFn = Apollo.MutationFunction<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>;

/**
 * __useAddItemToReceiptMutation__
 *
 * To run a mutation, you first call `useAddItemToReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToReceiptMutation, { data, loading, error }] = useAddItemToReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToReceiptMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>(AddItemToReceiptDocument, options);
      }
export type AddItemToReceiptMutationHookResult = ReturnType<typeof useAddItemToReceiptMutation>;
export type AddItemToReceiptMutationResult = Apollo.MutationResult<AddItemToReceiptMutation>;
export type AddItemToReceiptMutationOptions = Apollo.BaseMutationOptions<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>;
export const ReceiptDocument = gql`
    query Receipt($receiptId: ID!) {
  receipt(id: $receiptId) {
    id
    total
    items {
      id
      name
      price
    }
  }
}
    `;

/**
 * __useReceiptQuery__
 *
 * To run a query within a React component, call `useReceiptQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptQuery({
 *   variables: {
 *      receiptId: // value for 'receiptId'
 *   },
 * });
 */
export function useReceiptQuery(baseOptions: Apollo.QueryHookOptions<ReceiptQuery, ReceiptQueryVariables> & ({ variables: ReceiptQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
      }
export function useReceiptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
        }
export function useReceiptSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
        }
export type ReceiptQueryHookResult = ReturnType<typeof useReceiptQuery>;
export type ReceiptLazyQueryHookResult = ReturnType<typeof useReceiptLazyQuery>;
export type ReceiptSuspenseQueryHookResult = ReturnType<typeof useReceiptSuspenseQuery>;
export type ReceiptQueryResult = Apollo.QueryResult<ReceiptQuery, ReceiptQueryVariables>;
export const CreateMyReceiptDocument = gql`
    mutation CreateMyReceipt($input: ReceiptInput) {
  createMyReceipt(input: $input) {
    id
    total
    description
  }
}
    `;
export type CreateMyReceiptMutationFn = Apollo.MutationFunction<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>;

/**
 * __useCreateMyReceiptMutation__
 *
 * To run a mutation, you first call `useCreateMyReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyReceiptMutation, { data, loading, error }] = useCreateMyReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMyReceiptMutation(baseOptions?: Apollo.MutationHookOptions<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>(CreateMyReceiptDocument, options);
      }
export type CreateMyReceiptMutationHookResult = ReturnType<typeof useCreateMyReceiptMutation>;
export type CreateMyReceiptMutationResult = Apollo.MutationResult<CreateMyReceiptMutation>;
export type CreateMyReceiptMutationOptions = Apollo.BaseMutationOptions<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>;
export const DeleteMyReceiptDocument = gql`
    mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {
  deleteMyReceipt(input: $input)
}
    `;
export type DeleteMyReceiptMutationFn = Apollo.MutationFunction<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>;

/**
 * __useDeleteMyReceiptMutation__
 *
 * To run a mutation, you first call `useDeleteMyReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyReceiptMutation, { data, loading, error }] = useDeleteMyReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMyReceiptMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>(DeleteMyReceiptDocument, options);
      }
export type DeleteMyReceiptMutationHookResult = ReturnType<typeof useDeleteMyReceiptMutation>;
export type DeleteMyReceiptMutationResult = Apollo.MutationResult<DeleteMyReceiptMutation>;
export type DeleteMyReceiptMutationOptions = Apollo.BaseMutationOptions<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>;
export const MeWithReceiptsDocument = gql`
    query MeWithReceipts {
  me {
    id
    receipts {
      id
      description
      total
    }
  }
}
    `;

/**
 * __useMeWithReceiptsQuery__
 *
 * To run a query within a React component, call `useMeWithReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeWithReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeWithReceiptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeWithReceiptsQuery(baseOptions?: Apollo.QueryHookOptions<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>(MeWithReceiptsDocument, options);
      }
export function useMeWithReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>(MeWithReceiptsDocument, options);
        }
export function useMeWithReceiptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>(MeWithReceiptsDocument, options);
        }
export type MeWithReceiptsQueryHookResult = ReturnType<typeof useMeWithReceiptsQuery>;
export type MeWithReceiptsLazyQueryHookResult = ReturnType<typeof useMeWithReceiptsLazyQuery>;
export type MeWithReceiptsSuspenseQueryHookResult = ReturnType<typeof useMeWithReceiptsSuspenseQuery>;
export type MeWithReceiptsQueryResult = Apollo.QueryResult<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginUserInput) {
  loginUser(input: $input) {
    id
    username
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: UserInput) {
  createUser(input: $input) {
    id
    username
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddItemToReceiptInput = {
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  receiptId: Scalars['ID']['input'];
};

export type AssignOrDeleteMeToItemInput = {
  itemId: Scalars['ID']['input'];
};

export type AssignUserToItemInput = {
  itemId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type DeleteItemPayload = {
  __typename?: 'DeleteItemPayload';
  id: Scalars['ID']['output'];
  msg: Scalars['String']['output'];
};

export type DeleteMyReceiptInput = {
  id: Scalars['ID']['input'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  sharedBy: Array<Maybe<User>>;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Me = {
  __typename?: 'Me';
  id: Scalars['ID']['output'];
  receipts: Array<Receipt>;
  totalPayables: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToReceipt: Item;
  assignMeToItem: Item;
  assignUserToItem: Item;
  createMyReceipt: Receipt;
  createUser: UserWithJwt;
  deleteMyReceipt: Scalars['ID']['output'];
  loginUser: UserWithJwt;
  logoutUser: Scalars['String']['output'];
  removeMeFromItem: DeleteItemPayload;
};


export type MutationAddItemToReceiptArgs = {
  input?: InputMaybe<AddItemToReceiptInput>;
};


export type MutationAssignMeToItemArgs = {
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
};


export type MutationAssignUserToItemArgs = {
  input?: InputMaybe<AssignUserToItemInput>;
};


export type MutationCreateMyReceiptArgs = {
  input?: InputMaybe<ReceiptInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationDeleteMyReceiptArgs = {
  input?: InputMaybe<DeleteMyReceiptInput>;
};


export type MutationLoginUserArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type MutationRemoveMeFromItemArgs = {
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  myReceipts: Array<Receipt>;
  receipt: Receipt;
  users: Array<Maybe<User>>;
};


export type QueryReceiptArgs = {
  id: Scalars['ID']['input'];
};

export type Receipt = {
  __typename?: 'Receipt';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<Item>;
  total?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ReceiptInput = {
  description: Scalars['String']['input'];
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserWithJwt = {
  __typename?: 'UserWithJwt';
  accessToken: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, username: string } };

export type AddItemToReceiptMutationVariables = Exact<{
  input?: InputMaybe<AddItemToReceiptInput>;
}>;


export type AddItemToReceiptMutation = { __typename?: 'Mutation', addItemToReceipt: { __typename?: 'Item', id: string, name: string, price: string } };

export type ReceiptQueryVariables = Exact<{
  receiptId: Scalars['ID']['input'];
}>;


export type ReceiptQuery = { __typename?: 'Query', receipt: { __typename?: 'Receipt', id: string, total?: string | null, items: Array<{ __typename?: 'Item', id: string, name: string, price: string }> } };

export type CreateMyReceiptMutationVariables = Exact<{
  input?: InputMaybe<ReceiptInput>;
}>;


export type CreateMyReceiptMutation = { __typename?: 'Mutation', createMyReceipt: { __typename?: 'Receipt', id: string, total?: string | null, description: string } };

export type DeleteMyReceiptMutationVariables = Exact<{
  input: DeleteMyReceiptInput;
}>;


export type DeleteMyReceiptMutation = { __typename?: 'Mutation', deleteMyReceipt: string };

export type MeWithReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithReceiptsQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, receipts: Array<{ __typename?: 'Receipt', id: string, description: string, total?: string | null }> } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: string };

export type LoginUserMutationVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithJwt', id: string, username: string } };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserWithJwt', id: string, username: string } };
