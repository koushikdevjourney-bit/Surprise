export function formatOpsDate(value) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00`)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function experienceTitle(experiences, experienceId) {
  return experiences.find((item) => item.id === experienceId)?.title ?? '—'
}
