import type { IconName } from '@/types'

interface DashboardCard {
  icon: IconName
  title: string
  value: string
  color: string
}

export const dashboardCards: DashboardCard[] = [
  {
    icon: 'UsersOutline',
    title: 'Users',
    value: '2,453',
    color: '#DF18FF',
  },
  {
    icon: 'MultiUsersOutline',
    title: 'Active Users',
    value: '2,453',
    color: '#5718FF',
  },
  {
    icon: 'FileCoin',
    title: 'Users with Loans',
    value: '12,453',
    color: '#F55F44',
  },
  {
    icon: 'CoinSolid',
    title: 'Users with Savings',
    value: '102,453',
    color: '#FF3366',
  },
]

export * from './modules'
