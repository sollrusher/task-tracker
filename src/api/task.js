import http from './http'

export const getTasksList = async () => {
  const response = await http.get('/task')
  return response.data
}

export const getTask = async (id) => {
  const response = await http.get('/task', {}, { id })
  return response.data
}

export const createTask = async (title, description, status) => {
  const response = await http.post('/task', {
    title,
    description,
    status,
  })
  return response.data
}

export const updateTask = async (title, description, status, id) => {
  const response = await http.patch('/task', {
    title,
    description,
    status,
    id,
  })
  return response.data
}

export const setEstimate = async (task_id, estimate) => {
  const response = await http.post('/task/estimate', {
    task_id,
    estimate,
  })
  return response.data
}
