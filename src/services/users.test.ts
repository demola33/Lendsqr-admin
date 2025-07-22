import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchUsers } from './users'
import * as mockUsersModule from './mockUsers'

const mockUser = {
  id: '1',
  fullName: 'Test User',
  phoneNumber: '123',
  email: 'test@example.com',
  bvn: '123',
  bank: 'TestBank',
  gender: 'Male',
  maritalStatus: 'Single',
  children: '0',
  residenceType: 'Own',
  educationLevel: 'Bachelor',
  employmentStatus: 'Employed',
  employmentSector: 'IT',
  employmentDuration: '1 year',
  officeEmail: 'office@test.com',
  monthlyIncome: '100k',
  loanRepayment: 1000,
  twitter: '',
  facebook: '',
  instagram: '',
  guarantorName: '',
  guarantorPhone: '',
  guarantorEmail: '',
  relationship: '',
  organization: 'TestOrg',
  username: 'testuser',
  dateJoined: '2023-01-01T00:00:00.000Z',
  status: 'Active', // Use the correct union type value
  rating: 5,
  amount: 1000,
  uuid: 'uuid',
} as const

describe('fetchUsers', () => {
  const originalFetch = global.fetch
  beforeEach(() => {
    vi.resetAllMocks()
  })
  afterEach(() => {
    global.fetch = originalFetch
  })

  it('returns users from API on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockUser],
    })
    const users = await fetchUsers()
    expect(users.length).toBe(1)
    expect(users[0].email).toBe('test@example.com')
  })

  it('returns mock users on API failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    vi.spyOn(mockUsersModule, 'generateMockUsers').mockReturnValue([mockUser])
    const users = await fetchUsers()
    expect(users.length).toBe(1)
    expect(users[0].email).toBe('test@example.com')
  })
})
