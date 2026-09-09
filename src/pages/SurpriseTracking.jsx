import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import { trackingStatusLabel, trackingTimeline } from '../data/tracking'
import { getBookingById, getExperience, getOccasion } from '../lib/booking'
import { formatDate, formatTime } from '../lib/format'

export default function SurpriseTracking() {
  const { id } = useParams()
  const booking = getBookingById(id)

  if (!booking) {
    return (
      <Layout>
        <EmptyState
          title="We couldn’t find that mission"
          body="That Mission ID may be old, or the surprise hasn’t been launched yet."
          primaryTo="/create-surprise"
          primaryLabel="Create Surprise"
          secondaryTo="/"
          secondaryLabel="Back to Home"
        />
      </Layout>
    )
  }

  const experience = getExperience(booking)
  const occasion = getOccasion(booking)

  return (
    <Layout>
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.14em] text-pink-hot">
          Mission ID · {booking.id}
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-snow sm:text-4xl">Mission Control</h1>
        <p className="mt-3 text-base text-fog">
          {booking.recipientName} · {booking.recipientCity} · {formatDate(booking.date)} · {formatTime(booking.time)}
        </p>
        <p className="mt-4 inline-flex rounded-full bg-pink/15 px-3 py-1 text-sm font-semibold text-pink-hot">
          {trackingStatusLabel}
        </p>

        <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="relative h-44 bg-void">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute left-6 top-8 h-16 w-24 rounded-lg bg-line" />
              <div className="absolute right-10 top-6 h-20 w-16 rounded-lg bg-pink/20" />
              <div className="absolute bottom-8 left-16 h-12 w-28 rounded-lg bg-snow/10" />
              <div className="absolute bottom-10 right-16 h-14 w-20 rounded-lg bg-line" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-line bg-panel px-4 py-2 text-center">
                <p className="text-xs font-semibold text-pink-hot">Surprise Crew nearby</p>
                <p className="text-[11px] text-fog">{booking.recipientCity} · live map coming soon</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <h2 className="mb-4 font-display text-xl text-snow">Live timeline</h2>
          <Timeline items={trackingTimeline} />
          <p className="mt-6 text-sm leading-relaxed text-fog">
            Your surprise is being handled by the Surprise Crew.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <h2 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">
            Original mission details
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-fog">Experience</dt>
              <dd className="text-right font-medium">{experience?.title ?? '—'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fog">Occasion</dt>
              <dd className="font-medium">{occasion?.label ?? '—'}</dd>
            </div>
            {booking.message?.trim() ? (
              <div>
                <dt className="text-fog">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-snow">{booking.message}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      </main>
    </Layout>
  )
}
