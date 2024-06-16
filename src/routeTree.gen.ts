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
import { Route as AuthDashboardImport } from './routes/_auth.dashboard'
import { Route as AuthAboutImport } from './routes/_auth.about'

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

const AuthDashboardRoute = AuthDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAboutRoute = AuthAboutImport.update({
  path: '/about',
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
    '/_auth/about': {
      id: '/_auth/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AuthAboutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
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
  AuthRoute: AuthRoute.addChildren({ AuthAboutRoute, AuthDashboardRoute }),
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
        "/_auth/about",
        "/_auth/dashboard"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/about": {
      "filePath": "_auth.about.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard": {
      "filePath": "_auth.dashboard.tsx",
      "parent": "/_auth"
    },
    "/sign_up/": {
      "filePath": "sign_up/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
