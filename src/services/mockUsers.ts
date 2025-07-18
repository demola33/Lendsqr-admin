import type { User } from '@/types'
import { formatDate } from '@/utils/formatDate'

// Helper functions for data generation
const generatePhone = () => {
  const prefixes = ['070', '080', '081', '090']
  return (
    prefixes[Math.floor(Math.random() * prefixes.length)] +
    Math.floor(10000000 + Math.random() * 90000000).toString()
  )
}

const generateDate = () => {
  const start = new Date(2018, 0, 1)
  const end = new Date()
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return formatDate(date)
}

const organizations = ['Landbar', 'Ironu', 'Landstar', 'Fintech Global', 'CreditPlus']
const firstNames = [
  'Grace',
  'Adedaji',
  'Dobby',
  'Toila',
  'Debby',
  'Martin',
  'George',
  'Effiom',
  'Ogana',
  'Dokummu',
]
const lastNames = [
  'Effiom',
  'Ogana',
  'Dokummu',
  'Stutes',
  'Johnson',
  'Williams',
  'Brown',
  'Davis',
  'Miller',
]
const genders = ['Male', 'Female']
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed']
const childrenOptions = ['None', '1', '2', '3', '4+']
const residenceTypes = ["Parent's Apartment", 'Rented Apartment', 'Own House', 'Shared Apartment']
const educationLevels = ['B.Sc', 'M.Sc', 'PhD', 'HND', 'OND', 'SSCE']
const employmentStatuses = ['Employed', 'Unemployed', 'Self-Employed', 'Student']
const employmentSectors = [
  'FinTech',
  'Healthcare',
  'Education',
  'Agriculture',
  'Government',
  'Real Estate',
]
const relationships = ['Sister', 'Brother', 'Mother', 'Father', 'Friend', 'Colleague', 'Spouse']
const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted']

// Generate 500 user records
export const generateMockUsers = (count = 500): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const fullName = `${firstName} ${lastName}`
    const phone = generatePhone()

    return {
      id: `user-${i + 1}`,
      fullName,
      phoneNumber: phone,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      bvn: Math.floor(10000000000 + Math.random() * 90000000000).toString(),
      gender: genders[Math.floor(Math.random() * genders.length)],
      maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
      children: childrenOptions[Math.floor(Math.random() * childrenOptions.length)],
      residenceType: residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
      educationLevel: educationLevels[Math.floor(Math.random() * educationLevels.length)],
      employmentStatus: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
      employmentSector: employmentSectors[Math.floor(Math.random() * employmentSectors.length)],
      employmentDuration: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: `${firstName.toLowerCase()}@${organizations[Math.floor(Math.random() * organizations.length)].toLowerCase()}.com`,
      monthlyIncome: `₦${(Math.floor(Math.random() * 50) + 10) * 10000},000.00`,
      loanRepayment: Math.floor(Math.random() * 100000) + 10000,
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      guarantorName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      guarantorPhone: generatePhone(),
      guarantorEmail: `guarantor${i + 1}@example.com`,
      relationship: relationships[Math.floor(Math.random() * relationships.length)],
      organization: organizations[Math.floor(Math.random() * organizations.length)],
      username: `${firstName}${lastName}`,
      dateJoined: generateDate(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}
