import { useState } from 'react'
import { imageForExperience } from '../data/experienceImages'
import { isDigitalExperience } from '../data/experiences'
import ExperienceDetailModal from './ExperienceDetailModal'

const tagStyles = {
  Popular: 'bg-pink/15 text-pink-hot',
  New: 'bg-mood-anonymous/15 text-mood-anonymous',
  'NRI Favorite': 'bg-mood-nri/15 text-mood-nri',
  Premium: 'bg-mood-premium/15 text-mood-premium',
  Instant: 'bg-indigo-500/20 text-indigo-300',
  Digital: 'bg-indigo-500/20 text-indigo-300',
  'Budget-friendly': 'bg-indigo-500/15 text-indigo-200',
  Group: 'bg-orange-500/20 text-orange-300',
  Friends: 'bg-orange-500/15 text-orange-200',
  'Go Big': 'bg-pink/15 text-pink-hot',
  Wildcard: 'bg-mood-funny/15 text-mood-funny',
  'Most Unique': 'bg-mood-anonymous/15 text-mood-anonymous',
}

export default function ExperienceCard(experience) {
  const {
    id,
    emoji,
    title,
    name,
    description,
    price,
    mood = 'birthday',
    tags = [],
    occasions = [],
    cta = true,
    deliveryTime,
  } = experience
  const [open, setOpen] = useState(false)
  const digital = isDigitalExperience(experience)
  const displayName = title || name
  const image = imageForExperience(id)

  return (
    <>
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-transform duration-200 hover:-translate-y-0.5 ${
          digital
            ? 'border-[rgba(99,102,241,0.4)] shadow-[0_0_20px_rgba(99,102,241,0.15)]'
            : `bg-panel mood-border-${mood}`
        }`}
        style={digital ? { background: 'linear-gradient(180deg, #1a1a3e 0%, #0d0d2e 100%)' } : undefined}
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-black/10" />
          <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-black/45 text-2xl backdrop-blur-sm">
            <span aria-hidden="true">{emoji}</span>
          </div>
          {digital ? (
            <span className="absolute top-3 right-3 rounded-full bg-indigo-500/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
              ⚡ INSTANT
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-bold text-snow">{displayName}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">{description}</p>
        {digital ? (
          <p className="mt-3 text-xs font-semibold text-indigo-300">{deliveryTime ?? 'Ready in 2 hours'}</p>
        ) : null}
        {digital ? (
          <span className="mt-3 inline-flex w-fit rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-200">
            No crew needed
          </span>
        ) : null}
        {occasions.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {occasions.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagStyles[tag] ?? 'bg-raised text-fog'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-5 font-ui text-sm font-semibold text-pink-hot">{price}</p>
        {cta && id ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 text-left font-ui text-sm font-semibold text-snow underline-offset-4 hover:text-pink-hot hover:underline"
          >
            Customize →
          </button>
        ) : null}
        </div>
      </article>
      <ExperienceDetailModal experience={experience} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
