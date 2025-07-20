export interface AppInputProps {
  id: string
  label: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date'
  placeholder?: string
  state?: boolean | null
  disabled?: boolean
  required?: boolean
  trim?: boolean
  name?: string
  hint?: string
  floatingLabel?: boolean
  inputClass?: string | string[] | Record<string, boolean>
}

export interface AppDropdownProps {
  modelValue: string | number
  id: string
  label: string
  options: DropdownOption[]
  placeholder?: string
  state?: boolean | null
  disabled?: boolean
  required?: boolean
  name?: string
  hint?: string
  floatingLabel?: boolean
}

export interface ImageProps {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
}

export interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface AvatarProps {
  name: string
  subtitle?: string
  image?: ImageProps
  size?: 'small' | 'medium' | 'large'
}
