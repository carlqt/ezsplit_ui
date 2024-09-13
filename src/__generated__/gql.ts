/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Me {\n    me {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n": types.MeDocument,
    "\n  fragment ReceiptItemFields on Item {\n    name\n    price\n  }\n": types.ReceiptItemFieldsFragmentDoc,
    "\n  mutation AddItemToReceipt($input: AddItemToReceiptInput) {\n    addItemToReceipt(input: $input) {\n      id\n      ...ReceiptItemFields\n    }\n  }\n": types.AddItemToReceiptDocument,
    "\n  fragment ReceiptItemList on Receipt {\n    items {\n      id\n      ...ReceiptItemFields\n    }\n  }\n": types.ReceiptItemListFragmentDoc,
    "\n  mutation generatePublicUrl($receiptId: ID!) {\n    generatePublicUrl(id: $receiptId) {\n      id\n      slug\n    }\n  }\n": types.GeneratePublicUrlDocument,
    "\n  query Receipt($receiptId: ID!) {\n    receipt(id: $receiptId) {\n      id\n      total\n      description\n      slug\n      ...ReceiptItemList\n    }\n  }\n": types.ReceiptDocument,
    "\n  mutation CreateMyReceipt($input: ReceiptInput) {\n    createMyReceipt(input: $input) {\n      id\n      ...ReceiptFields\n    }\n  }\n": types.CreateMyReceiptDocument,
    "\n  fragment ReceiptFields on Receipt {\n    id\n    description\n    total\n  }\n": types.ReceiptFieldsFragmentDoc,
    "\n  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {\n    deleteMyReceipt(input: $input)\n  }\n": types.DeleteMyReceiptDocument,
    "\n  fragment ReceiptsOnMe on Me {\n    receipts {\n      id\n      ...ReceiptFields\n    }\n  }\n": types.ReceiptsOnMeFragmentDoc,
    "\n  query MeWithReceipts {\n    me {\n      id\n      ...ReceiptsOnMe\n    }\n  }\n": types.MeWithReceiptsDocument,
    "\n  mutation LogoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  mutation LoginUser($input: LoginUserInput) {\n    loginUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation CreateGuestUser($input: CreateGuestUserInput!) {\n    createGuestUser(input: $input) {\n      id\n      username\n      state\n    }\n  }\n": types.CreateGuestUserDocument,
    "\n  fragment PublicReceiptItemFields on Item {\n    name\n    price\n    sharedBy {\n      id\n      username\n    }\n  }\n": types.PublicReceiptItemFieldsFragmentDoc,
    "\n  mutation AssignOrRemoveMeFromItem($itemId: ID!) {\n    assignOrRemoveMeFromItem(itemId: $itemId) {\n      itemId\n    }\n  }\n": types.AssignOrRemoveMeFromItemDocument,
    "\n  fragment PublicReceiptItems on Receipt {\n    items {\n      id\n      ...PublicReceiptItemFields\n    }\n  }\n": types.PublicReceiptItemsFragmentDoc,
    "\n  query PublicReceipt($slug: String!) {\n    publicReceipt(slug: $slug) {\n      id\n      total\n      description\n      ...PublicReceiptItems\n    }\n  }\n": types.PublicReceiptDocument,
    "\n  mutation CreateUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReceiptItemFields on Item {\n    name\n    price\n  }\n"): (typeof documents)["\n  fragment ReceiptItemFields on Item {\n    name\n    price\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddItemToReceipt($input: AddItemToReceiptInput) {\n    addItemToReceipt(input: $input) {\n      id\n      ...ReceiptItemFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddItemToReceipt($input: AddItemToReceiptInput) {\n    addItemToReceipt(input: $input) {\n      id\n      ...ReceiptItemFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReceiptItemList on Receipt {\n    items {\n      id\n      ...ReceiptItemFields\n    }\n  }\n"): (typeof documents)["\n  fragment ReceiptItemList on Receipt {\n    items {\n      id\n      ...ReceiptItemFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation generatePublicUrl($receiptId: ID!) {\n    generatePublicUrl(id: $receiptId) {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation generatePublicUrl($receiptId: ID!) {\n    generatePublicUrl(id: $receiptId) {\n      id\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Receipt($receiptId: ID!) {\n    receipt(id: $receiptId) {\n      id\n      total\n      description\n      slug\n      ...ReceiptItemList\n    }\n  }\n"): (typeof documents)["\n  query Receipt($receiptId: ID!) {\n    receipt(id: $receiptId) {\n      id\n      total\n      description\n      slug\n      ...ReceiptItemList\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMyReceipt($input: ReceiptInput) {\n    createMyReceipt(input: $input) {\n      id\n      ...ReceiptFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMyReceipt($input: ReceiptInput) {\n    createMyReceipt(input: $input) {\n      id\n      ...ReceiptFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReceiptFields on Receipt {\n    id\n    description\n    total\n  }\n"): (typeof documents)["\n  fragment ReceiptFields on Receipt {\n    id\n    description\n    total\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {\n    deleteMyReceipt(input: $input)\n  }\n"): (typeof documents)["\n  mutation DeleteMyReceipt($input: DeleteMyReceiptInput!) {\n    deleteMyReceipt(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReceiptsOnMe on Me {\n    receipts {\n      id\n      ...ReceiptFields\n    }\n  }\n"): (typeof documents)["\n  fragment ReceiptsOnMe on Me {\n    receipts {\n      id\n      ...ReceiptFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeWithReceipts {\n    me {\n      id\n      ...ReceiptsOnMe\n    }\n  }\n"): (typeof documents)["\n  query MeWithReceipts {\n    me {\n      id\n      ...ReceiptsOnMe\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($input: LoginUserInput) {\n    loginUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($input: LoginUserInput) {\n    loginUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGuestUser($input: CreateGuestUserInput!) {\n    createGuestUser(input: $input) {\n      id\n      username\n      state\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGuestUser($input: CreateGuestUserInput!) {\n    createGuestUser(input: $input) {\n      id\n      username\n      state\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PublicReceiptItemFields on Item {\n    name\n    price\n    sharedBy {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  fragment PublicReceiptItemFields on Item {\n    name\n    price\n    sharedBy {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AssignOrRemoveMeFromItem($itemId: ID!) {\n    assignOrRemoveMeFromItem(itemId: $itemId) {\n      itemId\n    }\n  }\n"): (typeof documents)["\n  mutation AssignOrRemoveMeFromItem($itemId: ID!) {\n    assignOrRemoveMeFromItem(itemId: $itemId) {\n      itemId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PublicReceiptItems on Receipt {\n    items {\n      id\n      ...PublicReceiptItemFields\n    }\n  }\n"): (typeof documents)["\n  fragment PublicReceiptItems on Receipt {\n    items {\n      id\n      ...PublicReceiptItemFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PublicReceipt($slug: String!) {\n    publicReceipt(slug: $slug) {\n      id\n      total\n      description\n      ...PublicReceiptItems\n    }\n  }\n"): (typeof documents)["\n  query PublicReceipt($slug: String!) {\n    publicReceipt(slug: $slug) {\n      id\n      total\n      description\n      ...PublicReceiptItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      state\n      totalPayables\n      orders {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;