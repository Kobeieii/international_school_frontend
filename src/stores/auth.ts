import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage('token', { access: '', refresh: '' })
  
  function setToken(access: string, refresh: string) {
    token.value.access = access
    token.value.refresh = refresh
  }
  function clearToken() {
    token.value.access = ''
    token.value.refresh = ''
  }
  return { token, setToken, clearToken }
})
