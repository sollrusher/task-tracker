import { useEffect, useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(user)
  }, [])

  const setNewUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const clearUser = () => {
    setUser({})
    localStorage.clear('user')
  }

  return [user, setNewUser, clearUser]
}

export default useUser
