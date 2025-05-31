import type { MeData, Token } from '@/models/auth'
import { defineStore } from 'pinia'
import { Auth } from '@/models/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage<Token>('token', { access: '', refresh: '' })
  const user = reactive<MeData>(Auth.getInitMeData())

  function setToken(access: string, refresh: string) {
    token.value.access = access
    token.value.refresh = refresh
  }
  function clearToken() {
    token.value.access = ''
    token.value.refresh = ''
  }

  async function login(email: string, password: string) {
    const token = await Auth.login({ email, password })
    if (token) {
      setToken(token.access, token.refresh)
    }
    return token
  }

  function isHasToken() {
    return token.value.access !== '' && token.value.refresh !== ''
  }
  async function me() {
    try {
      const userData = await Auth.me()
      if (userData) {
        Object.assign(user, userData)
      }
    }
    catch {
      Object.assign(user, Auth.getInitMeData())
    }
  }
  return { token, setToken, clearToken, login, isHasToken, me }
})
