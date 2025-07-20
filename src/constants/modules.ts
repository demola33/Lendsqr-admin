import type { IconName } from '@/types'

interface Module {
  name: string
  icon: IconName
  link: string
  isDesktopOnly?: boolean
}

type ModuleList = {
  [keyof: string]: Module
}

export const dashboardModule: Module = {
  name: 'Dashboard',
  icon: 'Home',
  link: '/home',
}

export const switchOrganizationModule: Module = {
  name: 'Switch Organization',
  icon: 'BriefCase',
  link: '/switch-organization',
  isDesktopOnly: true,
}

/**
 * A mapping of module names to their display name and icon.
 * This constant is used throughout the application to provide a consistent
 * way of representing and displaying the various modules available.
 */
export const customerModules: ModuleList = {
  users: {
    name: 'Users',
    icon: 'Users',
    link: '/users',
  },
  guarantors: {
    name: 'Guarantors',
    icon: 'MultipleUsers',
    link: '/guarantors',
    isDesktopOnly: true,
  },
  loans: {
    name: 'Loans',
    icon: 'MoneyBag',
    link: '/loans',
  },
  decisionModels: {
    name: 'Decision Models',
    icon: 'HandShake',
    link: '/decision-models',
    isDesktopOnly: true,
  },
  savings: {
    name: 'Savings',
    icon: 'MoneyBag',
    link: '/savings',
  },
  loanRequests: {
    name: 'Loan Requests',
    icon: 'MoneyLend',
    link: '/loan-requests',
    isDesktopOnly: true,
  },
  whiteList: {
    name: 'White List',
    icon: 'UserCheck',
    link: '/white-list',
    isDesktopOnly: true,
  },
  karma: {
    name: 'Karma',
    icon: 'UserCancel',
    link: '/karma',
    isDesktopOnly: true,
  },
}

export const businessModules: ModuleList = {
  organization: {
    name: 'Organization',
    icon: 'BriefCase',
    link: '/organization',
    isDesktopOnly: true,
  },
  loanProducts: {
    name: 'Loan Products',
    icon: 'MoneyLend',
    link: '/loan-products',
    isDesktopOnly: true,
  },
  savingsProducts: {
    name: 'Savings Products',
    icon: 'BankSolid',
    link: '/savings-products',
    isDesktopOnly: true,
  },
  feesAndCharges: {
    name: 'Fees and Charges',
    icon: 'CoinSolid',
    link: '/fees-and-charges',
    isDesktopOnly: true,
  },
  transactions: {
    name: 'Transactions',
    icon: 'MobileExchange',
    link: '/transactions',
    isDesktopOnly: true,
  },
  services: {
    name: 'Services',
    icon: 'SwirlingGalaxy',
    link: '/services',
    isDesktopOnly: true,
  },
  serviceAccount: {
    name: 'Service Account',
    icon: 'UserSetting',
    link: '/service-account',
    isDesktopOnly: true,
  },
  settlements: {
    name: 'Settlements',
    icon: 'ScrollSolid',
    link: '/settlements',
    isDesktopOnly: true,
  },
  reports: {
    name: 'Reports',
    icon: 'ChartBar',
    link: '/reports',
    isDesktopOnly: true,
  },
}

export const settingsModules: ModuleList = {
  preferences: {
    name: 'Preferences',
    icon: 'SliderSetting',
    link: '/preferences',
    isDesktopOnly: true,
  },
  feesAndPricing: {
    name: 'Fees and Pricing',
    icon: 'BadgePercent',
    link: '/fees-and-pricing',
    isDesktopOnly: true,
  },
  auditLogs: {
    name: 'Audit Logs',
    icon: 'ClipBoardList',
    link: '/audit-logs',
    isDesktopOnly: true,
  },
  systemsMessages: {
    name: 'Systems Messages',
    icon: 'WheelsSolid',
    link: '/systems-messages',
    isDesktopOnly: true,
  },
}
