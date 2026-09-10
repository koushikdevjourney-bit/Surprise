import { useState } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import Layout from '../components/Layout'
import SeoHead from '../components/SeoHead'
import { flagsFor } from '../data/catalogFlags'
import {
  experienceFilters,
  experiences,
  isDigitalExperience,
  matchesExperienceFilter,
} from '../data/experiences'
import { formatInr } from '../lib/format'

const BUDGET_MIN = 1000
const BUDGET_MAX = 30000

export default function Experiences() {
  const [filter, setFilter] = useState('all')
  const [min, setMin] = useState(3000)
  const [max, setMax] = useState(15000)
  const [urgent, setUrgent] = useState(false)
  const [petFriendly, setPetFriendly] = useState(false)
  const [setting, setSetting] = useState('all')

  const inBudget = (item) => {
    const price = item.priceAmount ?? 0
    if (max >= BUDGET_MAX) return price >= min
    return price >= min && price <= max
  }

  const matchesFlags = (item) => {
    const flags = flagsFor(item.id)
    if (urgent && !flags.urgent) return false
    if (petFriendly && !flags.petFriendly) return false
    if (setting !== 'all' && flags.setting !== setting) return false
    return true
  }

  const crewVisible = experiences.filter(
    (item) =>
      !isDigitalExperience(item) &&
      matchesExperienceFilter(item, filter) &&
      inBudget(item) &&
      matchesFlags(item),
  )

  const digitalVisible = experiences.filter(
    (item) =>
      isDigitalExperience(item) &&
      matchesExperienceFilter(item, filter) &&
      inBudget(item) &&
      matchesFlags(item),
  )

  const recommendedIds = new Set(
    [...crewVisible, ...digitalVisible]
      .filter((item) => {
        const price = item.priceAmount ?? 0
        const mid = (min + Math.min(max, BUDGET_MAX)) / 2
        return Math.abs(price - mid) < 2500 || item.tags?.includes('Popular')
      })
      .map((item) => item.id),
  )

  const showDigital = filter === 'all' || filter === 'digital' || digitalVisible.length > 0
  const empty = !crewVisible.length && !digitalVisible.length

  function slideMin(value) {
    const next = Number(value)
    setMin(next)
    if (next > max) setMax(next)
  }
  function slideMax(value) {
    const next = Number(value)
    setMax(next)
    if (next < min) setMin(next)
  }

  return (
    <Layout>
      <SeoHead
        title="Experiences — Surprise"
        description="Browse surprise packages by mood and budget. Filter urgent setups, pet-friendly, indoor or outdoor."
        path="/experiences"
      />
      <main className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="font-display text-4xl font-extrabold text-snow sm:text-5xl">Experiences</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
            Slide your budget. We’ll highlight the bundles that actually fit.
          </p>

          <div className="mt-8 rounded-3xl border border-line bg-panel p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-ui text-sm font-semibold text-snow">Budget range</p>
              <p className="text-sm text-pink-hot">
                {formatInr(min)} — {max >= BUDGET_MAX ? `${formatInr(BUDGET_MAX)}+` : formatInr(max)}
              </p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-xs text-fog">
                Minimum
                <input
                  type="range"
                  min={BUDGET_MIN}
                  max={BUDGET_MAX}
                  step={500}
                  value={min}
                  onChange={(event) => slideMin(event.target.value)}
                  className="mt-2 w-full accent-[#FF3366]"
                />
              </label>
              <label className="text-xs text-fog">
                Maximum
                <input
                  type="range"
                  min={BUDGET_MIN}
                  max={BUDGET_MAX}
                  step={500}
                  value={max}
                  onChange={(event) => slideMax(event.target.value)}
                  className="mt-2 w-full accent-[#FF3366]"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip on={urgent} onClick={() => setUrgent((value) => !value)}>
                Under 24-Hour Urgent Setup
              </Chip>
              <Chip on={petFriendly} onClick={() => setPetFriendly((value) => !value)}>
                Pet-Friendly
              </Chip>
              <Chip on={setting === 'indoor'} onClick={() => setSetting((value) => (value === 'indoor' ? 'all' : 'indoor'))}>
                Indoor
              </Chip>
              <Chip on={setting === 'outdoor'} onClick={() => setSetting((value) => (value === 'outdoor' ? 'all' : 'outdoor'))}>
                Outdoor
              </Chip>
            </div>
          </div>

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
                <ExperienceCard key={item.id} {...item} recommended={recommendedIds.has(item.id)} />
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
                  <ExperienceCard key={item.id} {...item} recommended={recommendedIds.has(item.id)} />
                ))}
              </div>
            </section>
          ) : null}

          {empty ? (
            <p className="mt-16 text-center text-fog">Nothing in this range — widen the budget or clear a filter.</p>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 font-ui text-xs font-semibold ${
        on ? 'border-[#FF3366] bg-[#FF3366] text-white' : 'border-line bg-raised text-fog'
      }`}
    >
      {children}
    </button>
  )
}
