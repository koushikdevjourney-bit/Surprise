import { experiences } from '../data/experiences'
import { fees } from '../data/fees'
import { occasions } from '../data/occasions'
import { sampleBooking } from '../data/sampleBooking'
import { parseStartingPrice } from './format'

export const DRAFT_KEY = 'surprise.draft'
export const BOOKING_KEY = 'surprise.booking'

export function isBookingComplete(form) {
  if (!form) return false
  return Boolean(
    form.recipientName?.trim() &&
      form.recipientCity?.trim() &&
      form.occasion &&
      form.experienceId &&
      form.date &&
      form.time,
  )
}

export function getExperience(form) {
  return experiences.find((item) => item.id === form?.experienceId)
}

export function getOccasion(form) {
  return occasions.find((item) => item.id === form?.occasion)
}

export function getPricing(form) {
  const experience = getExperience(form)
  const experienceAmount = parseStartingPrice(experience?.startingPrice)
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
