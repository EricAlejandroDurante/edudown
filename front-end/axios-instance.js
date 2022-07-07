import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

const baseURL = 'http://localhost:3001/'

const publicInstance = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' }
})

const privateInstance = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' }
})

privateInstance.interceptors.request.use(
  async (request) => {
    const { accessToken } = await getSession()
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }
    return request
  },
  (error) => Promise.reject(error)
)

privateInstance.interceptors.response.use(response => response,
  (error) => {
    if (error.status === 401) {
      signOut({ redirect: false })
    }
    return Promise.reject(error)
  }
)

export { publicInstance, privateInstance }
