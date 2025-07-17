export interface AdminUser {
  id: string
  email: string
  name: string
  imageUrl: string
  role: 'admin' | 'superadmin' | 'support'
  organization: string
}
