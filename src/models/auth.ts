import axios from 'axios'

export interface LoginData {
  email: string
  password: string
}

export interface Token {
  access: string
  refresh: string
}

export interface MeData {
  id: number
  email: string
  permissions: string[]
}

export class Auth {
  static async login(data: LoginData): Promise<Token | null> {
    try {
      const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      const response = await api.post('/auth/login/', data)
      return response.data
    }
    catch (error) {
      console.error('Login failed:', error)
      return null
    }
  }

  static getInitMeData(): MeData {
    return {
      id: 0,
      email: '',
      permissions: [],
    }
  }
  static async me(): Promise<MeData | null> {
    try {
      const response = await axios.get('/auth/me/')
      return response.data
    }
    catch (error) {
      console.error('Failed to fetch user data:', error)
      return null
    }
  }
}
