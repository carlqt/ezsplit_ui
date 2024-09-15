/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as SignupIndexImport } from './routes/sign_up/index'
import { Route as AuthReceiptsIndexImport } from './routes/_auth.receipts/index'
import { Route as ReceiptsPublicReceiptSlugIndexImport } from './routes/receipts.public.$receiptSlug/index'
import { Route as AuthReceiptsReceiptIdIndexImport } from './routes/_auth.receipts.$receiptId/index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SignupIndexRoute = SignupIndexImport.update({
  path: '/sign_up/',
  getParentRoute: () => rootRoute,
} as any)

const AuthReceiptsIndexRoute = AuthReceiptsIndexImport.update({
  path: '/receipts/',
  getParentRoute: () => AuthRoute,
} as any)

const ReceiptsPublicReceiptSlugIndexRoute =
  ReceiptsPublicReceiptSlugIndexImport.update({
    path: '/receipts/public/$receiptSlug/',
    getParentRoute: () => rootRoute,
  } as any)

const AuthReceiptsReceiptIdIndexRoute = AuthReceiptsReceiptIdIndexImport.update(
  {
    path: '/receipts/$receiptId/',
    getParentRoute: () => AuthRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/sign_up/': {
      id: '/sign_up/'
      path: '/sign_up'
      fullPath: '/sign_up'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth/receipts/': {
      id: '/_auth/receipts/'
      path: '/receipts'
      fullPath: '/receipts'
      preLoaderRoute: typeof AuthReceiptsIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/receipts/$receiptId/': {
      id: '/_auth/receipts/$receiptId/'
      path: '/receipts/$receiptId'
      fullPath: '/receipts/$receiptId'
      preLoaderRoute: typeof AuthReceiptsReceiptIdIndexImport
      parentRoute: typeof AuthImport
    }
    '/receipts/public/$receiptSlug/': {
      id: '/receipts/public/$receiptSlug/'
      path: '/receipts/public/$receiptSlug'
      fullPath: '/receipts/public/$receiptSlug'
      preLoaderRoute: typeof ReceiptsPublicReceiptSlugIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthReceiptsIndexRoute: typeof AuthReceiptsIndexRoute
  AuthReceiptsReceiptIdIndexRoute: typeof AuthReceiptsReceiptIdIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthReceiptsIndexRoute: AuthReceiptsIndexRoute,
  AuthReceiptsReceiptIdIndexRoute: AuthReceiptsReceiptIdIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/sign_up': typeof SignupIndexRoute
  '/receipts': typeof AuthReceiptsIndexRoute
  '/receipts/$receiptId': typeof AuthReceiptsReceiptIdIndexRoute
  '/receipts/public/$receiptSlug': typeof ReceiptsPublicReceiptSlugIndexRoute
}

interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/sign_up': typeof SignupIndexRoute
  '/receipts': typeof AuthReceiptsIndexRoute
  '/receipts/$receiptId': typeof AuthReceiptsReceiptIdIndexRoute
  '/receipts/public/$receiptSlug': typeof ReceiptsPublicReceiptSlugIndexRoute
}

interface FileRoutesById {
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/sign_up/': typeof SignupIndexRoute
  '/_auth/receipts/': typeof AuthReceiptsIndexRoute
  '/_auth/receipts/$receiptId/': typeof AuthReceiptsReceiptIdIndexRoute
  '/receipts/public/$receiptSlug/': typeof ReceiptsPublicReceiptSlugIndexRoute
}

interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/sign_up'
    | '/receipts'
    | '/receipts/$receiptId'
    | '/receipts/public/$receiptSlug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/sign_up'
    | '/receipts'
    | '/receipts/$receiptId'
    | '/receipts/public/$receiptSlug'
  id:
    | '/'
    | '/_auth'
    | '/login'
    | '/sign_up/'
    | '/_auth/receipts/'
    | '/_auth/receipts/$receiptId/'
    | '/receipts/public/$receiptSlug/'
  fileRoutesById: FileRoutesById
}

interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
  SignupIndexRoute: typeof SignupIndexRoute
  ReceiptsPublicReceiptSlugIndexRoute: typeof ReceiptsPublicReceiptSlugIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
  SignupIndexRoute: SignupIndexRoute,
  ReceiptsPublicReceiptSlugIndexRoute: ReceiptsPublicReceiptSlugIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login",
        "/sign_up/",
        "/receipts/public/$receiptSlug/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/receipts/",
        "/_auth/receipts/$receiptId/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/sign_up/": {
      "filePath": "sign_up/index.tsx"
    },
    "/_auth/receipts/": {
      "filePath": "_auth.receipts/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/receipts/$receiptId/": {
      "filePath": "_auth.receipts.$receiptId/index.tsx",
      "parent": "/_auth"
    },
    "/receipts/public/$receiptSlug/": {
      "filePath": "receipts.public.$receiptSlug/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
