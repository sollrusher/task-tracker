import useUser from '@/hooks/useUser'
import { UserContext } from '@/hooks/useUserContext'
import '@/styles/globals.css'
import { createContext } from 'react'

export default function App({ Component, pageProps }) {
  const [user, setUser, clearUser] = useUser()
  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
