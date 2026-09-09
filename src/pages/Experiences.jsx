import { useMemo, useState } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import Layout from '../components/Layout'
import { experienceFilters, experiences, matchesExperienceFilter } from '../data/experiences'

export default function Experiences() {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => experiences.filter((item) => matchesExperienceFilter(item, filter)),
    [filter],
  )

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="font-display text-4xl font-extrabold text-snow sm:text-5xl">Experiences</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
          Browse like a menu. Filter by mood. Customize any mission in one tap.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {experienceFilters.map((item) => {
            const active = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`shrink-0 rounded-full border px-4 py-2 font-ui text-sm font-semibold ${
                  active ? 'border-pink bg-pink text-white' : 'border-line bg-panel text-fog hover:text-snow'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <ExperienceCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-fog">Nothing in this mood yet — try All or another filter.</p>
        )}
      </main>
    </Layout>
  )
}
