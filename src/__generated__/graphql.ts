/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  loginUser: UserWithJwt;
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


export type MutationLoginUserArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type MutationRemoveMeFromItemArgs = {
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  receipt: Receipt;
  receipts: Array<Maybe<Receipt>>;
  users: Array<Maybe<User>>;
};


export type QueryReceiptArgs = {
  id: Scalars['ID']['input'];
};

export type Receipt = {
  __typename?: 'Receipt';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<Maybe<Item>>;
  total?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ReceiptInput = {
  description: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
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

export type LoginUserMutationVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithJwt', id: string, username: string } };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserWithJwt', id: string, username: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, username: string } };


export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;