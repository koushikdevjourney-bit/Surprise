import { useMemo, useState } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import Layout from '../components/Layout'
import {
  experienceFilters,
  experiences,
  isDigitalExperience,
  matchesExperienceFilter,
} from '../data/experiences'

export default function Experiences() {
  const [filter, setFilter] = useState('all')

  const crewVisible = useMemo(
    () =>
      experiences.filter((item) => !isDigitalExperience(item) && matchesExperienceFilter(item, filter)),
    [filter],
  )

  const digitalVisible = useMemo(
    () => experiences.filter((item) => isDigitalExperience(item) && matchesExperienceFilter(item, filter)),
    [filter],
  )

  const showDigital = filter === 'all' || filter === 'digital' || digitalVisible.length > 0
  const empty = !crewVisible.length && !digitalVisible.length

  return (
    <Layout>
      <main className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="font-display text-4xl font-extrabold text-snow sm:text-5xl">Experiences</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
            Browse like a menu. Filter by mood. Customize any mission in one tap.
          </p>

          <div className="mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-2">
            {experienceFilters.map((item) => {
              const active = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-ui text-sm ${
                    active
                      ? 'border-pink bg-pink font-semibold text-white shadow-[0_0_18px_rgba(255,45,138,0.55)]'
                      : 'border-gray-600 bg-[#12121c] text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5">
          {crewVisible.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {crewVisible.map((item) => (
                <ExperienceCard key={item.id} {...item} />
              ))}
            </div>
          ) : null}

          {showDigital && digitalVisible.length ? (
            <section className="mt-16">
              <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">
                Can&apos;t wait for a crew? Go digital. ⚡
              </h2>
              <p className="mt-3 max-w-xl text-fog">
                Instant digital surprises — personalised, beautiful, delivered in 2 hours.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {digitalVisible.map((item) => (
                  <ExperienceCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          ) : null}

          {empty ? (
            <p className="mt-16 text-center text-fog">Nothing in this mood yet — try All or another filter.</p>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}
