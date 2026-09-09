export function formatTime(value) {
  if (!value) return '—'
  const [hours, minutes] = value.split(':')
  const hour = Number(hours)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 || 12
  return `${display}:${minutes} ${suffix}`
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00`)
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatInr(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}

export function parseStartingPrice(startingPrice) {
  const digits = String(startingPrice ?? '').replace(/[^\d]/g, '')
  return digits ? Number(digits) : 0
}
