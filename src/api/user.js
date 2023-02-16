import http from './http'

export const login = async (login, password) => {
  const response = await http.post('/user/login', { login, password })
  return response.data
}

export const register = async (login, password, firstName, lastName) => {
  const response = await http.post('/user/register', {
    login,
    password,
    firstName,
    lastName,
  })
  return response.data
}
