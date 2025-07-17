import { defineStore } from 'pinia'
import type { AdminUser, LoginCredentials } from '@/types'
import { loginAdmin } from '@/services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminUser: null as AdminUser | null,
    token: localStorage.getItem('authToken') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const credentials: LoginCredentials = { email, password }
      try {
        const { user, token } = await loginAdmin(credentials)
        this.adminUser = user
        this.token = token
        localStorage.setItem('authToken', token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout() {
      this.adminUser = null
      this.token = null
      localStorage.removeItem('authToken')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
