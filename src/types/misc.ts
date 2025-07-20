import type { IconName } from './generated'

/** A single item in the navigation bar or sidebar. */
export interface NavLink {
  name?: string
  /** The icon to attach at the side of the text. */
  icon: IconName
  /** The text of the navigation link. */
  text: string
  /** The url of the navigation link. */
  to?: string
  /** Whether or not the nav link should be visible only on the desktop. */
  isDesktopOnly?: boolean
  /** Whether or not the nav link should be active. */
  disabled?: boolean
  /** Function to run when the link is clicked. */
  onClick?: (event: MouseEvent) => void
}

export interface DashboardCard {
  icon: IconName
  title: string
  value: string
  color: string
}
