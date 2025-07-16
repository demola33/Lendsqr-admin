export interface AppInputProps {
  id: string
  label: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  state?: boolean | null
  disabled?: boolean
  required?: boolean
  trim?: boolean
  name?: string
  hint?: string
  inputClass?: string | string[] | Record<string, boolean>
}
