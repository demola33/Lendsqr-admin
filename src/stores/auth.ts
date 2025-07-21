import { defineStore } from 'pinia'
import type { AdminUser, LoginCredentials } from '@/types'
import { loginAdmin } from '@/services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminUser: null as AdminUser | null,
    token: localStorage.getItem('authToken') || null,
  }),
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      const credentials: LoginCredentials = { email, password }
      try {
        const { user, token } = await loginAdmin(credentials)
        this.adminUser = user
        this.token = token
        localStorage.setItem('authToken', token)
        localStorage.setItem('authUser', JSON.stringify(user))
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    getAuthUser(): AdminUser | null {
      const user = localStorage.getItem('authUser')
      const parsedUser = user ? JSON.parse(user) : null
      this.adminUser = parsedUser
      return parsedUser
    },

    logout(): void {
      this.adminUser = null
      this.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token
    },
  },
})
