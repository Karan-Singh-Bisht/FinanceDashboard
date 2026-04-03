import { createContext, useContext, useState, useCallback } from 'react'

type Role = 'admin' | 'user'

type RoleContextType = {
  role: Role
  isAdmin: boolean
  toggleRole: () => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('user')

  const toggleRole = useCallback(() => {
    setRole((prev) => (prev === 'admin' ? 'user' : 'admin'))
  }, [])

  return (
    <RoleContext.Provider value={{ role, isAdmin: role === 'admin', toggleRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}
