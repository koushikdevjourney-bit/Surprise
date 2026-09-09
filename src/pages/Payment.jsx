import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import {
  generateBookingId,
  getExperience,
  getOccasion,
  getPricing,
  isBookingComplete,
  resolveForm,
  saveBooking,
} from '../lib/booking'
import { formatDate, formatInr, formatTime } from '../lib/format'

const methods = [
  { id: 'upi', label: 'UPI', hint: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', hint: 'Debit or credit' },
  { id: 'later', label: 'Pay later', hint: 'Settle after the surprise' },
]

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const form = resolveForm(location.state)
  const [method, setMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)

  if (!isBookingComplete(form)) {
    return (
      <div className="min-h-svh bg-ivory">
        <Navbar />
        <EmptyState
          title="Nothing to pay for yet"
          body="Start a surprise first — we’ll bring you back here once you’ve reviewed the details."
          primaryTo="/create-surprise"
          primaryLabel="Create a Surprise"
          secondaryTo="/"
          secondaryLabel="Back to Home"
        />
        <Footer />
      </div>
    )
  }

  const experience = getExperience(form)
  const occasion = getOccasion(form)
  const pricing = getPricing(form)

  function handlePay() {
    if (processing) return
    setProcessing(true)
    window.setTimeout(() => {
      const booking = { ...form, id: generateBookingId() }
      saveBooking(booking)
      navigate('/confirmation', { state: { booking } })
    }, 1000)
  }

  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <h1 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">Almost there 🎉</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Confirm the details, pick a method, and we’ll lock in the surprise.
        </p>

        <section className="mt-8 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Recipient" value={form.recipientName} />
            <Row label="City" value={form.recipientCity} />
            <Row label="Occasion" value={occasion ? `${occasion.emoji} ${occasion.label}` : '—'} />
            <Row label="Experience" value={experience?.title ?? '—'} />
            <Row label="Date" value={formatDate(form.date)} />
            <Row label="Time" value={formatTime(form.time)} />
          </dl>
        </section>

        <section className="mt-4 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Price</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted">Experience</span>
              <span>{formatInr(pricing.experienceAmount)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Service fee</span>
              <span>{formatInr(pricing.serviceFee)}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-sand pt-3 font-semibold">
              <span>Total</span>
              <span className="text-terracotta">{formatInr(pricing.total)}</span>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">Payment method</h2>
          <div className="mt-4 grid gap-3">
            {methods.map((item) => {
              const selected = method === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-terracotta bg-terracotta/8 ring-2 ring-terracotta/20'
                      : 'border-sand bg-white hover:border-terracotta/30'
                  }`}
                >
                  <p className="font-semibold text-charcoal">{item.label}</p>
                  <p className="text-xs text-muted">{item.hint}</p>
                </button>
              )
            })}
          </div>
        </section>

        <Button
          type="button"
          className="mt-8 w-full px-7 py-3"
          disabled={processing}
          onClick={handlePay}
        >
          {processing ? 'Processing…' : `Pay ${formatInr(pricing.total)}`}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">This is a prototype — no real payment is taken.</p>
      </main>
      <Footer />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  )
}
