import { motion } from 'framer-motion'
import { getExperience, getOccasion } from '../../lib/booking'
import { formatDate, formatTime } from '../../lib/format'
import Button from '../Button'

const crewVibes = {
  'birthday-raid': 'Loud, joyful, cake-first energy',
  'secret-admirer': 'Quiet, mysterious, soft-focus',
  'midnight-mission': 'Cinematic, late-night, hush mode',
  'romantic-surprise': 'Warm, floral, main-character romance',
  'office-birthday-attack': 'Chaotic-good workplace raid',
  'best-friend-roast': 'Playful, savage, ride-or-die',
  'surprise-cab': 'Playlist on, destination classified',
  'memory-maker': 'Camera-ready, documentary-soft',
  'bollywood-moment': 'Full filmi, street-stage drama',
  'nri-love-package': 'Family-first, timezone-proof magic',
  'graduation-blast': 'Proud, loud, confetti-coded',
  'proposal-setup': 'Secret, precise, once-in-a-lifetime',
}

export default function StepBriefing({ data, onEdit, onBack, onContinue }) {
  const experience = getExperience(data)
  const occasion = getOccasion(data)
  const vibe = crewVibes[data.experienceId] ?? 'Local Surprise Crew, high-energy and on-brief'

  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 07 · Briefing</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Mission Briefing</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        This is the plan the Surprise Crew will run. Edit anything before you launch.
      </p>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`mt-8 overflow-hidden rounded-3xl border bg-panel mood-border-${experience?.mood ?? 'birthday'}`}
      >
        <div className="bg-gradient-to-br from-pink/20 via-transparent to-mood-anonymous/10 px-6 py-8 sm:px-8">
          <p className="font-bebas text-5xl tracking-wide text-snow sm:text-6xl">MISSION BRIEF</p>
          <p className="mt-2 font-ui text-sm text-pink-hot">
            {experience?.emoji} {experience?.title ?? 'Custom Moment'}
          </p>
        </div>

        <dl className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <BriefRow label="Target" value={`${data.recipientName} · ${data.relationship || 'Someone special'}`} />
          <BriefRow label="City" value={data.recipientCity} />
          <BriefRow label="Experience" value={experience?.title ?? '—'} />
          <BriefRow label="Occasion" value={occasion ? `${occasion.emoji} ${occasion.label}` : '—'} />
          <BriefRow label="Date" value={formatDate(data.date)} />
          <BriefRow label="Time" value={formatTime(data.time)} />
          <BriefRow label="Crew vibe" value={vibe} wide />
          <BriefRow
            label="Message"
            value={data.message.trim() || 'No personal message — the moment still lands.'}
            wide
          />
        </dl>

        <div className="flex flex-wrap gap-3 border-t border-line px-6 py-4 sm:px-8">
          <button type="button" className="text-sm font-semibold text-fog hover:text-snow" onClick={() => onEdit(1)}>
            Edit target
          </button>
          <button type="button" className="text-sm font-semibold text-fog hover:text-snow" onClick={() => onEdit(3)}>
            Edit experience
          </button>
          <button type="button" className="text-sm font-semibold text-fog hover:text-snow" onClick={() => onEdit(5)}>
            Edit when
          </button>
        </div>
      </motion.article>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="button" onClick={onContinue} className="w-full px-7 py-3 sm:w-auto">
          Proceed to Launch
        </Button>
      </div>
    </div>
  )
}

function BriefRow({ label, value, wide }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-fog">{label}</dt>
      <dd className="mt-1 text-base text-snow">{value}</dd>
    </div>
  )
}
