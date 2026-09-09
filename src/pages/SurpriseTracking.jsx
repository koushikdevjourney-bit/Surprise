import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import { trackingStatusLabel, trackingTimeline } from '../data/tracking'
import { getBookingById, getExperience, getOccasion } from '../lib/booking'
import { formatDate, formatTime } from '../lib/format'

export default function SurpriseTracking() {
  const { id } = useParams()
  const booking = getBookingById(id)

  if (!booking) {
    return (
      <div className="min-h-svh bg-ivory">
        <Navbar />
        <EmptyState
          title="We couldn’t find that surprise"
          body="That booking link may be old, or the surprise hasn’t been created yet."
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
  const occasion = getOccasion(booking)

  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">{booking.id}</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-charcoal sm:text-4xl">
          {booking.recipientName}&apos;s surprise
        </h1>
        <p className="mt-3 text-base text-muted">
          {booking.recipientCity} · {formatDate(booking.date)} · {formatTime(booking.time)}
        </p>
        <p className="mt-4 inline-flex rounded-full bg-terracotta/10 px-3 py-1 text-sm font-semibold text-terracotta">
          {trackingStatusLabel}
        </p>

        <section className="mt-8 overflow-hidden rounded-2xl border border-sand bg-card shadow-sm">
          <div className="relative h-44 bg-cream">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute left-6 top-8 h-16 w-24 rounded-lg bg-sand" />
              <div className="absolute right-10 top-6 h-20 w-16 rounded-lg bg-terracotta/20" />
              <div className="absolute bottom-8 left-16 h-12 w-28 rounded-lg bg-charcoal/10" />
              <div className="absolute bottom-10 right-16 h-14 w-20 rounded-lg bg-sand" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-sand bg-white px-4 py-2 text-center shadow-sm">
                <p className="text-xs font-semibold text-terracotta">Local team nearby</p>
                <p className="text-[11px] text-muted">{booking.recipientCity}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <Timeline items={trackingTimeline} />
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Your surprise is being handled by our local team.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
            Original surprise details
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Experience</dt>
              <dd className="text-right font-medium">{experience?.title ?? '—'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Occasion</dt>
              <dd className="font-medium">{occasion?.label ?? '—'}</dd>
            </div>
            {booking.message?.trim() ? (
              <div>
                <dt className="text-muted">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-charcoal">{booking.message}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      </main>
      <Footer />
    </div>
  )
}
