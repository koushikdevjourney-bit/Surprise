import { Link } from 'react-router-dom'

const tagStyles = {
  Popular: 'bg-pink/15 text-pink-hot',
  New: 'bg-mood-anonymous/15 text-mood-anonymous',
  'NRI Favorite': 'bg-mood-nri/15 text-mood-nri',
  Premium: 'bg-mood-premium/15 text-mood-premium',
}

export default function ExperienceCard({
  id,
  emoji,
  title,
  description,
  price,
  mood = 'birthday',
  tags = [],
  cta = true,
}) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border bg-panel p-6 transition-transform duration-200 hover:-translate-y-0.5 mood-border-${mood}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-raised text-3xl">
        <span aria-hidden="true">{emoji}</span>
      </div>
      <h3 className="font-display text-xl font-bold text-snow">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">{description}</p>
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
        <Link
          to={`/create-surprise?experience=${id}`}
          className="mt-4 font-ui text-sm font-semibold text-snow underline-offset-4 hover:text-pink-hot hover:underline"
        >
          Customize →
        </Link>
      ) : null}
    </article>
  )
}
