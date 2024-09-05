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

export type CreateGuestUserInput = {
  username: Scalars['String']['input'];
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
  sharedBy: Array<User>;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Me = {
  __typename?: 'Me';
  id: Scalars['ID']['output'];
  receipts: Array<Receipt>;
  state: UserState;
  totalPayables: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToReceipt: Item;
  assignMeToItem: Item;
  assignUserToItem: Item;
  createGuestUser: User;
  createMyReceipt: Receipt;
  createUser: UserWithJwt;
  deleteMyReceipt: Scalars['ID']['output'];
  generatePublicUrl: Receipt;
  loginUser: UserWithJwt;
  logoutUser: Scalars['String']['output'];
  removeMeFromItem: DeleteItemPayload;
  removePublicUrl: Receipt;
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


export type MutationCreateGuestUserArgs = {
  input?: InputMaybe<CreateGuestUserInput>;
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


export type MutationGeneratePublicUrlArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type MutationRemoveMeFromItemArgs = {
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
};


export type MutationRemovePublicUrlArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  myReceipts: Array<Receipt>;
  publicReceipt: Receipt;
  receipt: Receipt;
  users: Array<Maybe<User>>;
};


export type QueryPublicReceiptArgs = {
  slug: Scalars['String']['input'];
};


export type QueryReceiptArgs = {
  id: Scalars['ID']['input'];
};

export type Receipt = {
  __typename?: 'Receipt';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<Item>;
  slug: Scalars['String']['output'];
  total: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type ReceiptInput = {
  description: Scalars['String']['input'];
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  state: UserState;
  username: Scalars['String']['output'];
};

export type UserInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum UserState {
  Guest = 'GUEST',
  Verified = 'VERIFIED'
}

export type UserWithJwt = {
  __typename?: 'UserWithJwt';
  accessToken: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, username: string, state: UserState, totalPayables: string } | null };

export type AddItemToReceiptMutationVariables = Exact<{
  input?: InputMaybe<AddItemToReceiptInput>;
}>;


export type AddItemToReceiptMutation = { __typename?: 'Mutation', addItemToReceipt: { __typename?: 'Item', id: string, name: string, price: string } };

export type GeneratePublicUrlMutationVariables = Exact<{
  receiptId: Scalars['ID']['input'];
}>;


export type GeneratePublicUrlMutation = { __typename?: 'Mutation', generatePublicUrl: { __typename?: 'Receipt', id: string, slug: string } };

export type ReceiptQueryVariables = Exact<{
  receiptId: Scalars['ID']['input'];
}>;


export type ReceiptQuery = { __typename?: 'Query', receipt: { __typename?: 'Receipt', id: string, total: string, description: string, slug: string, items: Array<{ __typename?: 'Item', id: string, name: string, price: string }> } };

export type CreateMyReceiptMutationVariables = Exact<{
  input?: InputMaybe<ReceiptInput>;
}>;


export type CreateMyReceiptMutation = { __typename?: 'Mutation', createMyReceipt: { __typename?: 'Receipt', id: string, total: string, description: string } };

export type DeleteMyReceiptMutationVariables = Exact<{
  input: DeleteMyReceiptInput;
}>;


export type DeleteMyReceiptMutation = { __typename?: 'Mutation', deleteMyReceipt: string };

export type MeWithReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithReceiptsQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, receipts: Array<{ __typename?: 'Receipt', id: string, description: string, total: string }> } | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: string };

export type LoginUserMutationVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithJwt', id: string, username: string } };

export type CreateGuestUserMutationVariables = Exact<{
  input: CreateGuestUserInput;
}>;


export type CreateGuestUserMutation = { __typename?: 'Mutation', createGuestUser: { __typename?: 'User', id: string, username: string, state: UserState } };

export type AssignMeToItemMutationVariables = Exact<{
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
}>;


export type AssignMeToItemMutation = { __typename?: 'Mutation', assignMeToItem: { __typename?: 'Item', id: string, name: string, price: string, sharedBy: Array<{ __typename?: 'User', id: string, username: string }> } };

export type RemoveMeFromItemMutationVariables = Exact<{
  input?: InputMaybe<AssignOrDeleteMeToItemInput>;
}>;


export type RemoveMeFromItemMutation = { __typename?: 'Mutation', removeMeFromItem: { __typename?: 'DeleteItemPayload', id: string } };

export type PublicReceiptQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PublicReceiptQuery = { __typename?: 'Query', publicReceipt: { __typename?: 'Receipt', id: string, total: string, description: string, items: Array<{ __typename?: 'Item', id: string, name: string, price: string, sharedBy: Array<{ __typename?: 'User', id: string, username: string }> }> } };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserWithJwt', id: string, username: string } };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayables"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const AddItemToReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItemToReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddItemToReceiptInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemToReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>;
export const GeneratePublicUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generatePublicUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePublicUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GeneratePublicUrlMutation, GeneratePublicUrlMutationVariables>;
export const ReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Receipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<ReceiptQuery, ReceiptQueryVariables>;
export const CreateMyReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMyReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReceiptInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMyReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>;
export const DeleteMyReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMyReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMyReceiptInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>;
export const MeWithReceiptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeWithReceipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const CreateGuestUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGuestUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGuestUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGuestUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<CreateGuestUserMutation, CreateGuestUserMutationVariables>;
export const AssignMeToItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignMeToItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignOrDeleteMeToItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignMeToItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<AssignMeToItemMutation, AssignMeToItemMutationVariables>;
export const RemoveMeFromItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMeFromItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignOrDeleteMeToItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMeFromItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveMeFromItemMutation, RemoveMeFromItemMutationVariables>;
export const PublicReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PublicReceiptQuery, PublicReceiptQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;