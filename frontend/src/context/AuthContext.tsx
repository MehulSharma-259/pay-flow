import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  token : string | null,
  login: (newToken: string) => void,
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : AuthProviderProps) => {
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value = {{token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}