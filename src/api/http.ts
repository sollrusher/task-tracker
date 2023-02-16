import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:4000',
})

http.interceptors.request.use(function (config) {
  const token = `${JSON.parse(localStorage.getItem('user'))?.id}`;
  config.headers.Authorization =  token;
   
  return config;
});

const get = (url: string, headers = {}, params = {}) => {
  return http.get(url, {
    params: { ...params },
    headers: {
      ...headers,
    },
  })
}

const post = (url: string, data: object | any, headers = {}, params = {}) => {
  return http.post(url, data, {
    ...params,
    headers: {
      ...headers,
    },
  })
}

const put = (url: string, data: object | any, headers = {}) => {
  return http.put(url, data, {
    headers: {
      ...headers,
    },
  })
}

const remove = (url: string, data: object | any, headers = {}, params = {}) => {
  return http.delete(url, {
    params: { ...params },
    headers: {
      ...headers,
    },
    data,
  })
}
const patch = (url: string, data: object | any, headers = {}) => {
  return http.patch(url, data, {
    headers: {
      ...headers,
    },
  })
}

export default {
  http,
  get,
  post,
  put,
  remove,
  patch,
}
