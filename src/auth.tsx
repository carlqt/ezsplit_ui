import { createContext } from "react"
export interface IAuthContext {
  isAuthenticated: boolean
  // login: (username: string) => Promise<void>
  // logout: () => Promise<void>

  // Make this a type ME in graphql
  user: string | undefined
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: false, user: undefined }}>
      {children}
    </AuthContext.Provider>
  )
}
