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
  orders: Array<Item>;
  receipts: Array<Receipt>;
  state: UserState;
  totalPayables: Scalars['String']['output'];
  username: Scalars['String']['output'];
};


export type MeOrdersArgs = {
  filterInput?: InputMaybe<OrderFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToReceipt: Item;
  assignMeToItem: Item;
  assignOrRemoveMeFromItem: UserOrderRef;
  assignUserToItem: Item;
  createGuestUser: User;
  createMyReceipt: Receipt;
  createUser: Me;
  deleteMyReceipt: Scalars['ID']['output'];
  generatePublicUrl: Receipt;
  loginUser: Me;
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


export type MutationAssignOrRemoveMeFromItemArgs = {
  itemId: Scalars['ID']['input'];
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

export type OrderFilterInput = {
  receiptId: Scalars['ID']['input'];
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

export type UserOrderRef = {
  __typename?: 'UserOrderRef';
  itemId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
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


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, username: string, state: UserState, totalPayables: string, orders: Array<{ __typename?: 'Item', id: string }> } | null };

export type ReceiptItemFieldsFragment = { __typename?: 'Item', name: string, price: string } & { ' $fragmentName'?: 'ReceiptItemFieldsFragment' };

export type AddItemToReceiptMutationVariables = Exact<{
  input?: InputMaybe<AddItemToReceiptInput>;
}>;


export type AddItemToReceiptMutation = { __typename?: 'Mutation', addItemToReceipt: (
    { __typename?: 'Item', id: string }
    & { ' $fragmentRefs'?: { 'ReceiptItemFieldsFragment': ReceiptItemFieldsFragment } }
  ) };

export type ReceiptItemListFragment = { __typename?: 'Receipt', items: Array<(
    { __typename?: 'Item', id: string }
    & { ' $fragmentRefs'?: { 'ReceiptItemFieldsFragment': ReceiptItemFieldsFragment } }
  )> } & { ' $fragmentName'?: 'ReceiptItemListFragment' };

export type GeneratePublicUrlMutationVariables = Exact<{
  receiptId: Scalars['ID']['input'];
}>;


export type GeneratePublicUrlMutation = { __typename?: 'Mutation', generatePublicUrl: { __typename?: 'Receipt', id: string, slug: string } };

export type ReceiptQueryVariables = Exact<{
  receiptId: Scalars['ID']['input'];
}>;


export type ReceiptQuery = { __typename?: 'Query', receipt: (
    { __typename?: 'Receipt', id: string, total: string, description: string, slug: string }
    & { ' $fragmentRefs'?: { 'ReceiptItemListFragment': ReceiptItemListFragment } }
  ) };

export type CreateMyReceiptMutationVariables = Exact<{
  input?: InputMaybe<ReceiptInput>;
}>;


export type CreateMyReceiptMutation = { __typename?: 'Mutation', createMyReceipt: (
    { __typename?: 'Receipt' }
    & { ' $fragmentRefs'?: { 'ReceiptFieldsFragment': ReceiptFieldsFragment } }
  ) };

export type ReceiptFieldsFragment = { __typename?: 'Receipt', id: string, description: string, total: string } & { ' $fragmentName'?: 'ReceiptFieldsFragment' };

export type DeleteMyReceiptMutationVariables = Exact<{
  input: DeleteMyReceiptInput;
}>;


export type DeleteMyReceiptMutation = { __typename?: 'Mutation', deleteMyReceipt: string };

export type ReceiptsOnMeFragment = { __typename?: 'Me', receipts: Array<(
    { __typename?: 'Receipt', id: string }
    & { ' $fragmentRefs'?: { 'ReceiptFieldsFragment': ReceiptFieldsFragment } }
  )> } & { ' $fragmentName'?: 'ReceiptsOnMeFragment' };

export type MeWithReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithReceiptsQuery = { __typename?: 'Query', me?: (
    { __typename?: 'Me', id: string }
    & { ' $fragmentRefs'?: { 'ReceiptsOnMeFragment': ReceiptsOnMeFragment } }
  ) | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: string };

export type LoginUserMutationVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'Me', id: string, username: string, state: UserState, totalPayables: string, orders: Array<{ __typename?: 'Item', id: string }> } };

export type CreateGuestUserMutationVariables = Exact<{
  input: CreateGuestUserInput;
}>;


export type CreateGuestUserMutation = { __typename?: 'Mutation', createGuestUser: { __typename?: 'User', id: string, username: string, state: UserState } };

export type PublicReceiptItemFieldsFragment = { __typename?: 'Item', name: string, price: string, sharedBy: Array<{ __typename?: 'User', id: string, username: string }> } & { ' $fragmentName'?: 'PublicReceiptItemFieldsFragment' };

export type AssignOrRemoveMeFromItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
}>;


export type AssignOrRemoveMeFromItemMutation = { __typename?: 'Mutation', assignOrRemoveMeFromItem: { __typename?: 'UserOrderRef', itemId: string } };

export type PublicReceiptItemsFragment = { __typename?: 'Receipt', items: Array<(
    { __typename?: 'Item', id: string }
    & { ' $fragmentRefs'?: { 'PublicReceiptItemFieldsFragment': PublicReceiptItemFieldsFragment } }
  )> } & { ' $fragmentName'?: 'PublicReceiptItemsFragment' };

export type PublicReceiptQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PublicReceiptQuery = { __typename?: 'Query', publicReceipt: (
    { __typename?: 'Receipt', id: string, total: string, description: string }
    & { ' $fragmentRefs'?: { 'PublicReceiptItemsFragment': PublicReceiptItemsFragment } }
  ) };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Me', id: string, username: string, state: UserState, totalPayables: string, orders: Array<{ __typename?: 'Item', id: string }> } };

export const ReceiptItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<ReceiptItemFieldsFragment, unknown>;
export const ReceiptItemListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptItemFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<ReceiptItemListFragment, unknown>;
export const ReceiptFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<ReceiptFieldsFragment, unknown>;
export const ReceiptsOnMeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptsOnMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<ReceiptsOnMeFragment, unknown>;
export const PublicReceiptItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<PublicReceiptItemFieldsFragment, unknown>;
export const PublicReceiptItemsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicReceiptItems"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicReceiptItemFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<PublicReceiptItemsFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayables"}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const AddItemToReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItemToReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddItemToReceiptInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemToReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptItemFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<AddItemToReceiptMutation, AddItemToReceiptMutationVariables>;
export const GeneratePublicUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generatePublicUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePublicUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GeneratePublicUrlMutation, GeneratePublicUrlMutationVariables>;
export const ReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Receipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiptId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptItemList"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptItemList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptItemFields"}}]}}]}}]} as unknown as DocumentNode<ReceiptQuery, ReceiptQueryVariables>;
export const CreateMyReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMyReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReceiptInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMyReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<CreateMyReceiptMutation, CreateMyReceiptMutationVariables>;
export const DeleteMyReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMyReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMyReceiptInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteMyReceiptMutation, DeleteMyReceiptMutationVariables>;
export const MeWithReceiptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeWithReceipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptsOnMe"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReceiptsOnMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReceiptFields"}}]}}]}}]} as unknown as DocumentNode<MeWithReceiptsQuery, MeWithReceiptsQueryVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayables"}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const CreateGuestUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGuestUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGuestUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGuestUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<CreateGuestUserMutation, CreateGuestUserMutationVariables>;
export const AssignOrRemoveMeFromItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignOrRemoveMeFromItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignOrRemoveMeFromItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}}]} as unknown as DocumentNode<AssignOrRemoveMeFromItemMutation, AssignOrRemoveMeFromItemMutationVariables>;
export const PublicReceiptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicReceipt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicReceipt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicReceiptItems"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicReceiptItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicReceiptItems"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Receipt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicReceiptItemFields"}}]}}]}}]} as unknown as DocumentNode<PublicReceiptQuery, PublicReceiptQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayables"}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;