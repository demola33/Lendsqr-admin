/**
 * Formats a Date object into a human-readable string.
 * The format is "Month Day, Year Hour:Minute AM/PM", e.g., "Oct 10, 2023 2:45 PM".
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: Date): string {
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const datePart = date.toLocaleDateString('en-US', optionsDate)
  const timePart = date.toLocaleTimeString('en-US', optionsTime)

  return `${datePart} ${timePart}`
}
