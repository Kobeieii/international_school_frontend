import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    }
    else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

export function setupAxios() {
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_API}/api`
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  axios.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    if (authStore.token.access && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.token.access}`
    }
    return config
  })

  axios.interceptors.response.use(
    res => res,
    async (err) => {
      const originalRequest = err.config
      const authStore = useAuthStore()

      if (err.response?.status === 401 && err.response?.data?.code === 'token_not_valid' && !originalRequest._retry) {
        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axios(originalRequest)
          })
        }

        isRefreshing = true
        try {
          const api = axios.create({
            baseURL: `${import.meta.env.VITE_BASE_API}/api`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const res = await api.post('/auth/refresh/', {
            refresh: authStore.token.refresh,
          })

          const newAccess = res.data.access
          const newRefresh = res.data.refresh
          authStore.setToken(newAccess, newRefresh)
          processQueue(null, newAccess)

          originalRequest.headers.Authorization = `Bearer ${newAccess}`
          return axios(originalRequest)
        }
        catch (refreshErr) {
          processQueue(refreshErr, null)
          authStore.clearToken()
          window.location.href = '/login'
          return Promise.reject(refreshErr)
        }
        finally {
          isRefreshing = false
        }
      }

      return Promise.reject(err)
    },
  )
}
