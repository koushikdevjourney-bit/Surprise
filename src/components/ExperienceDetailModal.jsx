import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isDigitalExperience } from '../data/experiences'

export default function ExperienceDetailModal({ experience, open, onClose }) {
  const digital = isDigitalExperience(experience)

  useEffect(() => {
    if (!open) return undefined

    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  const name = experience?.name ?? experience?.title
  const timeLabel = digital
    ? experience?.deliveryTime ?? 'Ready in 2 hours'
    : experience?.deliveryTime ?? 'Crew arrives within 2-3 hours of scheduled time'

  return (
    <AnimatePresence>
      {open && experience ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center sm:px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-detail-title"
            className="max-h-[90svh] w-full overflow-y-auto rounded-t-3xl bg-[#1a1a2e] p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-4xl" aria-hidden="true">
              {experience.emoji}
            </p>
            <h2 id="experience-detail-title" className="mt-3 font-display text-2xl font-bold text-snow">
              {name}
            </h2>
            {experience.tagline ? (
              <p className="mt-2 text-sm italic text-pink-hot">{experience.tagline}</p>
            ) : null}

            <h3 className="mt-6 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-fog">
              What&apos;s included
            </h3>
            <ul className="mt-3 space-y-2">
              {(experience.includes ?? []).map((item) => (
                <li key={item} className="flex gap-2 text-sm text-snow">
                  <span className="text-pink-hot" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {experience.occasions?.length ? (
              <>
                <h3 className="mt-6 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-fog">
                  Perfect for
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {experience.occasions.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-gray-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {experience.moods?.length ? (
              <p className="mt-5 text-sm text-fog">
                Mood{' '}
                <span className="font-semibold text-snow">{experience.moods.join(' / ')}</span>
              </p>
            ) : null}

            <p className="mt-3 text-sm text-fog">{timeLabel}</p>
            {experience.note ? <p className="mt-2 text-sm text-fog">{experience.note}</p> : null}

            <p className="mt-6 font-display text-3xl font-extrabold text-pink-hot">{experience.price}</p>

            <Link
              to={`/create-surprise?experience=${experience.id}`}
              className="mt-6 flex w-full items-center justify-center rounded-2xl bg-pink px-5 py-3 font-ui text-sm font-semibold text-white"
            >
              Customize & Build →
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-2xl px-5 py-3 font-ui text-sm font-semibold text-fog hover:text-snow"
            >
              Back
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
