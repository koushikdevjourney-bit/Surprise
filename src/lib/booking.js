import { experiences } from '../data/experiences'
import { fees } from '../data/fees'
import { occasions } from '../data/occasions'
import { sampleBooking } from '../data/sampleBooking'
import { emptyBuilder } from '../data/surpriseBuilder'
import { builderFromExperience, getBuilderSubtotal, hasBuiltSurprise, normalizeBuilder } from './builder'
import { formatInr, parseStartingPrice } from './format'

export const DRAFT_KEY = 'surprise.draft'
export const BOOKING_KEY = 'surprise.booking'
export const PLANNER_KEY = 'surprise.planner'

export const emptyForm = {
  recipientName: '',
  recipientCity: '',
  relationship: '',
  occasion: '',
  experienceId: '',
  loves: '',
  dislikes: '',
  message: '',
  instructions: '',
  date: '',
  time: '',
  address: '',
  phone: '',
  mood: '',
  builder: { ...emptyBuilder },
}

export function formFromPlan(plan) {
  if (!plan) return {}
  const occasionId = occasions.some((item) => item.id === plan.occasion)
    ? plan.occasion
    : occasions.find((item) => item.label.toLowerCase() === String(plan.occasion ?? '').toLowerCase())?.id

  const experienceId = experiences.some((item) => item.id === plan.experienceId) ? plan.experienceId : ''
  return {
    recipientCity: plan.city ?? '',
    occasion: occasionId ?? '',
    experienceId,
    loves: plan.whyItWorks ?? '',
    message: plan.summary ?? '',
    instructions: plan.crewNotes ?? '',
    builder: experienceId ? builderFromExperience(experienceId) : normalizeBuilder(),
  }
}

export function savePlannerPlan(plan) {
  sessionStorage.setItem(PLANNER_KEY, JSON.stringify(plan))
}

export function loadPlannerPlan() {
  try {
    const raw = sessionStorage.getItem(PLANNER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearPlannerPlan() {
  sessionStorage.removeItem(PLANNER_KEY)
}

export function isBookingComplete(form) {
  if (!form) return false
  return Boolean(
    form.recipientName?.trim() &&
      form.recipientCity?.trim() &&
      form.occasion &&
      (form.experienceId || hasBuiltSurprise(form)) &&
      form.date &&
      form.time,
  )
}

export function getExperience(form) {
  if (hasBuiltSurprise(form)) {
    const total = getBuilderSubtotal(form)
    const crewName = form.builder?.crewId
    const catalogCrew = experiences.find((item) => item.id === form.experienceId)
    return {
      id: 'custom-build',
      title: 'Custom Surprise',
      emoji: '🎯',
      description: 'A mission you built — crew, extras, and the vibe.',
      priceAmount: total,
      startingPrice: formatInr(total),
      price: formatInr(total),
      mood: form.mood || catalogCrew?.mood || 'birthday',
      crewId: crewName,
    }
  }
  return experiences.find((item) => item.id === form?.experienceId)
}

export function getOccasion(form) {
  return occasions.find((item) => item.id === form?.occasion)
}

export function getPricing(form) {
  const experience = getExperience(form)
  const experienceAmount = hasBuiltSurprise(form)
    ? getBuilderSubtotal(form)
    : (experience?.priceAmount ?? parseStartingPrice(experience?.startingPrice))
  const serviceFee = fees.SERVICE_FEE_INR
  return {
    experienceAmount,
    serviceFee,
    total: experienceAmount + serviceFee,
  }
}

export function saveDraft(form) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form))
}

export function loadDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveBooking(booking) {
  sessionStorage.setItem(BOOKING_KEY, JSON.stringify(booking))
}

export function loadBooking() {
  try {
    const raw = sessionStorage.getItem(BOOKING_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function generateBookingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `SR-${suffix}`
}

export function getBookingById(id) {
  if (!id) return null
  const stored = loadBooking()
  if (stored?.id === id) return stored
  if (sampleBooking.id === id) return sampleBooking
  return null
}

export function resolveForm(locationState) {
  return locationState?.form ?? loadDraft()
}

export function resolveBooking(locationState) {
  return locationState?.booking ?? loadBooking()
}
