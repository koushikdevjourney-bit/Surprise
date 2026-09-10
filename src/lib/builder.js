import {
  addonOptions,
  captureOptions,
  crewOptions,
  emptyBuilder,
  entertainmentOptions,
  experienceBuilderPresets,
  messageOptions,
  sweetOptions,
  decorOptions,
  transportOptions,
} from '../data/surpriseBuilder'

export function normalizeBuilder(builder) {
  return { ...emptyBuilder, ...builder }
}

export function builderFromExperience(experienceId) {
  const preset = experienceBuilderPresets[experienceId]
  return preset ? normalizeBuilder(preset) : normalizeBuilder()
}

export function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

function line(item, section, extra = {}) {
  if (!item) return null
  return {
    id: item.id,
    section,
    emoji: item.emoji,
    name: item.name,
    price: item.price,
    included: Boolean(item.included),
    ...extra,
  }
}

export function getBuilderLines(form) {
  const builder = normalizeBuilder(form?.builder)
  const lines = []

  const crew = crewOptions.find((item) => item.id === builder.crewId)
  if (crew) lines.push(line(crew, 'crew', { removable: false }))

  const transport = transportOptions.find((item) => item.id === builder.transportId)
  if (transport && transport.id !== 'none') {
    lines.push(line(transport, 'transport', { removable: true }))
  } else if (transport) {
    lines.push(line(transport, 'transport', { removable: false }))
  }

  for (const id of builder.sweets) {
    lines.push(line(sweetOptions.find((item) => item.id === id), 'sweets', { removable: true }))
  }
  for (const id of builder.decor) {
    lines.push(line(decorOptions.find((item) => item.id === id), 'decor', { removable: true }))
  }

  const entertainment = entertainmentOptions.find((item) => item.id === builder.entertainmentId)
  if (entertainment) lines.push(line(entertainment, 'entertainment', { removable: true }))

  for (const id of builder.capture) {
    lines.push(line(captureOptions.find((item) => item.id === id), 'capture', { removable: true }))
  }
  for (const id of builder.messages) {
    lines.push(line(messageOptions.find((item) => item.id === id), 'messages', { removable: true }))
  }
  for (const id of builder.addons) {
    lines.push(line(addonOptions.find((item) => item.id === id), 'addons', { removable: true }))
  }

  return lines.filter(Boolean)
}

export function getBuilderSubtotal(form) {
  return getBuilderLines(form).reduce((sum, item) => sum + item.price, 0)
}

export function hasBuiltSurprise(form) {
  return Boolean(form?.builder?.crewId)
}

export function removeBuilderLine(builder, lineItem) {
  const next = normalizeBuilder(builder)
  if (lineItem.section === 'transport') return { ...next, transportId: 'none' }
  if (lineItem.section === 'entertainment') return { ...next, entertainmentId: '' }
  if (['sweets', 'decor', 'capture', 'messages', 'addons'].includes(lineItem.section)) {
    return { ...next, [lineItem.section]: next[lineItem.section].filter((id) => id !== lineItem.id) }
  }
  return next
}
