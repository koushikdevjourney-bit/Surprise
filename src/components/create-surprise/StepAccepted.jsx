import { motion } from 'framer-motion'
import { confirmationTimeline } from '../../data/tracking'
import { getExperience } from '../../lib/booking'
import { formatDate, formatTime } from '../../lib/format'
import Button from '../Button'
import Timeline from '../Timeline'

export default function StepAccepted({ booking }) {
  const experience = getExperience(booking)

  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 09 · Accepted</p>
      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl"
      >
        Mission Accepted 🎯
      </motion.h2>
      <p className="mt-4 text-base leading-relaxed text-fog">
        You may be miles away, but you&apos;re about to be part of their moment.
      </p>

      <section className="mt-8 rounded-2xl border border-line bg-panel p-5 sm:p-6">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-pink-hot">Mission ID</p>
        <p className="mt-1 font-bebas text-4xl tracking-wide text-snow">{booking.id}</p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-fog">Target</dt>
            <dd className="font-medium">{booking.recipientName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fog">City</dt>
            <dd className="font-medium">{booking.recipientCity}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fog">Experience</dt>
            <dd className="text-right font-medium">{experience?.title ?? '—'}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fog">Date</dt>
            <dd className="font-medium">{formatDate(booking.date)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fog">Time</dt>
            <dd className="font-medium">{formatTime(booking.time)}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 rounded-2xl border border-line bg-panel p-5 sm:p-6">
        <h3 className="mb-4 font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">
          What happens next
        </h3>
        <Timeline items={confirmationTimeline} />
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to={`/surprise/${booking.id}`} className="w-full px-6 py-3 sm:flex-1">
          Mission Control
        </Button>
        <Button to="/" variant="secondary" className="w-full px-6 py-3 sm:flex-1">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
