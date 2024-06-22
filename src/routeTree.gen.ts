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
import { Route as AuthReceiptImport } from './routes/_auth.receipt'

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

const AuthReceiptRoute = AuthReceiptImport.update({
  path: '/receipt',
  getParentRoute: () => AuthRoute,
} as any)

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
    '/_auth/receipt': {
      id: '/_auth/receipt'
      path: '/receipt'
      fullPath: '/receipt'
      preLoaderRoute: typeof AuthReceiptImport
      parentRoute: typeof AuthImport
    }
    '/sign_up/': {
      id: '/sign_up/'
      path: '/sign_up'
      fullPath: '/sign_up'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({ AuthReceiptRoute }),
  LoginRoute,
  SignupIndexRoute,
})

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
        "/sign_up/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/receipt"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/receipt": {
      "filePath": "_auth.receipt.tsx",
      "parent": "/_auth"
    },
    "/sign_up/": {
      "filePath": "sign_up/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
