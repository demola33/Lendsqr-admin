import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppDataTable from '../AppDataTable.vue'
import type { User } from '@/types/user'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

vi.mock('@bhplugin/vue3-datatable', () => ({
  default: {
    props: ['rows', 'isLoading'],
    template: `
      <div>
        <table>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>
              <div class="bh-skeleton-box bh-h-8"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  },
}))

describe('AppDataTable', () => {
  const rows: User[] = [
    {
      id: '1',
      fullName: 'Test',
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
      dateJoined: '2023',
      status: 'Active',
      rating: 5,
      amount: 1000,
      uuid: 'uuid',
    },
  ]
  it('renders table rows (positive)', () => {
    const wrapper = mount(AppDataTable, { props: { rows } })
    expect(wrapper.findAll('tbody tr').length).toBe(1)
  })

  it('shows loading state (negative)', () => {
    const wrapper = mount(AppDataTable, { props: { rows, isLoading: true } })
    expect(wrapper.find('.bh-skeleton-box').exists()).toBeTruthy()
  })
})
