import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import Button from '../components/Button'
import { confirmationTimeline } from '../data/tracking'
import { getExperience, isBookingComplete, resolveBooking } from '../lib/booking'
import { formatDate, formatTime } from '../lib/format'
import { useLocation } from 'react-router-dom'

export default function Confirmation() {
  const location = useLocation()
  const booking = resolveBooking(location.state)

  if (!isBookingComplete(booking) || !booking.id) {
    return (
      <div className="min-h-svh bg-ivory">
        <Navbar />
        <EmptyState
          title="No booking to show"
          body="Once you complete payment, your confirmation will land here."
          primaryTo="/create-surprise"
          primaryLabel="Create a Surprise"
          secondaryTo="/"
          secondaryLabel="Back to Home"
        />
        <Footer />
      </div>
    )
  }

  const experience = getExperience(booking)

  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <h1 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
          Your surprise is booked! 🎉
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          You may be miles away, but you&apos;re about to be part of their special moment.
        </p>

        <section className="mt-8 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Booking ID</p>
          <p className="mt-1 font-display text-2xl text-charcoal">{booking.id}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Recipient</dt>
              <dd className="font-medium">{booking.recipientName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">City</dt>
              <dd className="font-medium">{booking.recipientCity}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Surprise</dt>
              <dd className="text-right font-medium">{experience?.title ?? '—'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Date</dt>
              <dd className="font-medium">{formatDate(booking.date)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Time</dt>
              <dd className="font-medium">{formatTime(booking.time)}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-4 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
            What happens next
          </h2>
          <Timeline items={confirmationTimeline} />
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to={`/surprise/${booking.id}`} className="w-full px-6 py-3 sm:flex-1">
            View Surprise
          </Button>
          <Button to="/" variant="secondary" className="w-full px-6 py-3 sm:flex-1">
            Back to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
