export interface User {
  id: string
  // Personal Information
  fullName: string
  phoneNumber: string
  email: string
  bvn: string
  bank: string
  gender: string
  maritalStatus: string
  children: string
  residenceType: string

  // Education and Employment
  educationLevel: string
  employmentStatus: string
  employmentSector: string
  employmentDuration: string
  officeEmail: string
  monthlyIncome: string
  loanRepayment: number

  // Socials
  twitter: string
  facebook: string
  instagram: string

  // Guarantor
  guarantorName: string
  guarantorPhone: string
  guarantorEmail: string
  relationship: string

  // Organization Info
  organization: string
  username: string
  dateJoined: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

  rating: number
  amount: number
  uuid: string
}
