import { createContext, useContext } from 'react'

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  clearUser: () => {},
})

export const useUserContext = () => useContext(UserContext)
