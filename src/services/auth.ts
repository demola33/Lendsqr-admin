import type { AdminUser, LoginCredentials } from '@/types'

// Mock admin user data
const ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@smartlenders.com',
    role: 'admin',
    organization: 'global',
    imageUrl: 'https://i.pravatar.cc/300',
  },
]

export const loginAdmin = async (
  credentials: LoginCredentials,
): Promise<{ user: AdminUser; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = ADMIN_USERS.find(
        (u) => u.email === credentials.email && credentials.password === 'defaultPassword', // Mock validation
      )

      if (user) {
        resolve({
          user,
          token: 'mock-jwt-token-for-' + user.id,
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 800) // Simulate API delay
  })
}
