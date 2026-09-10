import {
  emptyPlan,
  PLAN_STORAGE_KEY,
  REVEAL_STORAGE_KEY,
  TRACK_STORAGE_KEY,
  WHATSAPP_NUMBER,
  planAddons,
  planOccasions,
  planVenues,
  planVibes,
} from '../data/planWizard'

export function loadPlan() {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY)
    return raw ? { ...emptyPlan, ...JSON.parse(raw) } : { ...emptyPlan }
  } catch {
    return { ...emptyPlan }
  }
}

export function savePlan(plan) {
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan))
}

export function getPlanPricing(plan) {
  const occasion = planOccasions.find((item) => item.id === plan.occasion)
  const venue = planVenues.find((item) => item.id === plan.venue)
  const addons = planAddons.filter((item) => plan.addons.includes(item.id))
  const lines = []
  if (occasion) lines.push({ name: occasion.label, price: occasion.base })
  if (venue && venue.price > 0) lines.push({ name: venue.label, price: venue.price })
  addons.forEach((item) => lines.push({ name: item.label, price: item.price }))
  const total = lines.reduce((sum, item) => sum + item.price, 0)
  const advance = Math.round(total * 0.25)
  return { lines, total, advance, occasion, venue, addons, vibe: planVibes.find((item) => item.id === plan.vibe) }
}

export function whatsappHref(plan) {
  const { total, occasion, venue, vibe, addons } = getPlanPricing(plan)
  const pay = plan.payMode === 'advance' ? '25% token advance' : 'Full payment'
  const text = [
    'Hi Surprise India! I want to book a plan.',
    `Recipient: ${plan.recipientName || '—'}`,
    `Occasion: ${occasion?.label || '—'}`,
    `Date: ${plan.date || '—'} ${plan.time || ''}`.trim(),
    `Vibe: ${vibe?.label || '—'}`,
    `Venue: ${venue?.label || '—'}`,
    `Add-ons: ${addons.map((item) => item.label).join(', ') || 'None'}`,
    plan.cakeMessage ? `Cake message: ${plan.cakeMessage}` : null,
    `Total: ₹${total.toLocaleString('en-IN')} (${pay})`,
  ]
    .filter(Boolean)
    .join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function createReveal(plan) {
  const id = `RV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const record = {
    id,
    recipientName: plan.recipientName || 'You',
    revealText: plan.revealText || `Pack your bags — ${plan.occasion || 'a surprise'} is waiting.`,
    lockUntil: plan.lockUntil || '',
    createdAt: Date.now(),
  }
  const all = loadReveals()
  all[id] = record
  localStorage.setItem(REVEAL_STORAGE_KEY, JSON.stringify(all))
  return record
}

export function loadReveals() {
  try {
    return JSON.parse(localStorage.getItem(REVEAL_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getReveal(id) {
  if (id === 'demo') {
    return {
      id: 'demo',
      recipientName: 'Priya',
      revealText: 'Pack your bags, date night at 8 PM!',
      lockUntil: '',
    }
  }
  return loadReveals()[id] ?? null
}

export function getTrack(id) {
  try {
    const all = JSON.parse(localStorage.getItem(TRACK_STORAGE_KEY) || '{}')
    return all[id] ?? { id, step: 1 }
  } catch {
    return { id, step: 1 }
  }
}

export function saveTrack(id, step) {
  try {
    const all = JSON.parse(localStorage.getItem(TRACK_STORAGE_KEY) || '{}')
    all[id] = { id, step }
    localStorage.setItem(TRACK_STORAGE_KEY, JSON.stringify(all))
  } catch {
    /* ignore */
  }
}
