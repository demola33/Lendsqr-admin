import type { User } from '@/types'
import { generateMockUsers } from './mockUsers'
import { formatDate } from '@/utils/formatDate'

const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL

/**
 * User service module for fetching and managing user data.
 * This module handles API requests to retrieve user information,
 * with fallback to local mock data generation if needed.
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Attempt to fetch from the mock API
    const response = await fetch(MOCK_API_URL)

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const users: User[] = await response.json()

    // Transform data types and formats where needed
    return users.map((user) => ({
      ...user,
      dateJoined: formatDate(new Date(user.dateJoined)),
      loanRepayment: Number(user.loanRepayment),
      // Add any other transformations here
    }))
  } catch (error) {
    console.error('Failed to fetch users from mock API', error)

    // Fallback to local generation if API fails
    return generateMockUsers(500).map((user) => ({
      ...user,
      dateJoined: formatDate(new Date(user.dateJoined)),
    }))
  }
}
