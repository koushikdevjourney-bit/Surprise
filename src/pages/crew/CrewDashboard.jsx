import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import { completedMissions, weeklyChart } from '../../data/crew'
import { formatInr } from '../../lib/format'

const initialMissions = [
  {
    id: 'm1',
    status: 'CONFIRMED',
    mission: 'Birthday Raid',
    target: 'P***a',
    location: 'Banjara Hills, Hyderabad',
    date: 'Tomorrow, 7:00 PM',
    role: 'Photographer',
    pay: 800,
  },
  {
    id: 'm2',
    status: 'PENDING',
    mission: 'Romantic Surprise',
    target: '[Hidden until confirmed]',
    location: 'Jubilee Hills, Hyderabad',
    date: '15 Sept, 6:30 PM',
    role: 'Photographer',
    pay: 900,
  },
]

const stats = [
  { emoji: '💰', value: '₹12,400', label: 'Earned this month' },
  { emoji: '🎯', value: '18', label: 'Missions completed' },
  { emoji: '⭐', value: '4.9', label: 'Your rating' },
  { emoji: '✅', value: '3', label: 'Upcoming missions' },
]

const statusStyles = {
  CONFIRMED: {
    badge: 'bg-[#22c55e]/15 text-[#22c55e]',
    border: 'border-l-[#22c55e]',
    label: 'CONFIRMED',
  },
  PENDING: {
    badge: 'bg-[#eab308]/15 text-[#eab308]',
    border: 'border-l-[#eab308]',
    label: 'PENDING CONFIRMATION',
  },
  COMPLETED: {
    badge: 'bg-[#FF3366]/15 text-[#FF3366]',
    border: 'border-l-[#FF3366]',
    label: 'COMPLETED',
  },
}

const maxWeek = Math.max(...weeklyChart.map((item) => item.amount))

export default function CrewDashboard() {
  const [missions, setMissions] = useState(initialMissions)
  const [openId, setOpenId] = useState(null)
  const [contactId, setContactId] = useState(null)

  function accept(id) {
    setMissions((current) => current.map((item) => (item.id === id ? { ...item, status: 'CONFIRMED', target: 'A***a' } : item)))
  }

  function decline(id) {
    setMissions((current) => current.filter((item) => item.id !== id))
  }

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d0d0d]"
      >
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-snow sm:text-4xl">Hey Arjun 👋</h1>
              <p className="mt-2 text-fog">Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-[#1a1a2e] px-3 py-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF3366] font-ui text-sm font-bold text-white">
                AK
              </span>
              <div>
                <p className="font-ui text-sm font-semibold text-snow">Arjun K.</p>
                <p className="text-xs text-fog">Photographer • Hyderabad</p>
              </div>
            </div>
          </div>

          <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-white/10 bg-[#1a1a2e] p-5">
                <p className="text-xl" aria-hidden="true">
                  {stat.emoji}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-[#FF3366]">{stat.value}</p>
                <p className="mt-1 text-sm text-fog">{stat.label}</p>
              </article>
            ))}
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-snow">Upcoming Missions 🎯</h2>
            <div className="mt-5 grid gap-4">
              {missions.length === 0 ? (
                <p className="rounded-2xl border border-white/10 bg-[#1a1a2e] p-6 text-sm text-fog">
                  No upcoming missions right now. New ones land here first.
                </p>
              ) : (
                missions.map((mission) => {
                  const style = statusStyles[mission.status]
                  return (
                    <article
                      key={mission.id}
                      className={`rounded-2xl border border-white/10 border-l-4 bg-[#1a1a2e] p-5 sm:p-6 ${style.border}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl font-bold text-snow">{mission.mission}</h3>
                          <dl className="mt-3 grid gap-1.5 text-sm text-fog sm:grid-cols-2">
                            <div>
                              <dt className="inline text-fog/70">Target: </dt>
                              <dd className="inline text-snow">{mission.target}</dd>
                            </div>
                            <div>
                              <dt className="inline text-fog/70">Location: </dt>
                              <dd className="inline text-snow">{mission.location}</dd>
                            </div>
                            <div>
                              <dt className="inline text-fog/70">Date: </dt>
                              <dd className="inline text-snow">{mission.date}</dd>
                            </div>
                            <div>
                              <dt className="inline text-fog/70">Your role: </dt>
                              <dd className="inline text-snow">{mission.role}</dd>
                            </div>
                          </dl>
                          <p className="mt-3 text-sm font-semibold text-[#22c55e]">Pay: {formatInr(mission.pay)}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 font-ui text-[11px] font-bold tracking-wide ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>

                      {openId === mission.id ? (
                        <p className="mt-4 rounded-xl border border-white/10 bg-[#0d0d0d] p-3 text-sm text-fog">
                          Brief drops 2 hours before showtime. Bring your kit, wear black, and check in with the
                          coordinator on arrival.
                        </p>
                      ) : null}
                      {contactId === mission.id ? (
                        <p className="mt-3 rounded-xl border border-[#FF3366]/30 bg-[#FF3366]/10 p-3 text-sm text-snow">
                          Coordinator: Riya · WhatsApp +91 98xxx xxxxx
                        </p>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {mission.status === 'PENDING' ? (
                          <>
                            <Button
                              type="button"
                              className="bg-[#22c55e] px-4 py-2 shadow-none hover:bg-[#16a34a]"
                              onClick={() => accept(mission.id)}
                            >
                              Accept
                            </Button>
                            <Button type="button" variant="ghost" className="px-4 py-2" onClick={() => decline(mission.id)}>
                              Decline
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="button"
                              variant="secondary"
                              className="px-4 py-2"
                              onClick={() => setOpenId((current) => (current === mission.id ? null : mission.id))}
                            >
                              View Details
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="px-4 py-2"
                              onClick={() => setContactId((current) => (current === mission.id ? null : mission.id))}
                            >
                              Contact Coordinator
                            </Button>
                          </>
                        )}
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-snow">Recent Missions ✓</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e]">
              <ul className="divide-y divide-white/10">
                {completedMissions.map((row) => (
                  <li
                    key={row.name}
                    className="grid grid-cols-2 items-center gap-2 px-4 py-4 text-sm sm:grid-cols-5 sm:px-5"
                  >
                    <p className="font-semibold text-snow">{row.name}</p>
                    <p className="text-fog">{row.date}</p>
                    <p className="hidden text-fog sm:block">{row.role}</p>
                    <p className="text-[#22c55e]">{formatInr(row.pay)}</p>
                    <p className="text-[#eab308]">⭐ {row.rating.toFixed(1)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-snow">Your earnings — last 4 weeks</h2>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#1a1a2e] p-5 sm:p-8">
              <div className="flex h-48 items-end gap-4 sm:gap-6">
                {weeklyChart.map((week) => (
                  <div key={week.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <p className="font-ui text-xs font-semibold text-[#22c55e]">{formatInr(week.amount)}</p>
                    <div
                      className="w-full max-w-16 rounded-t-xl bg-gradient-to-t from-[#d0166c] to-[#FF3366]"
                      style={{ height: `${Math.max(12, (week.amount / maxWeek) * 100)}%` }}
                    />
                    <p className="font-ui text-xs text-fog">{week.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 pb-8">
            <h2 className="font-display text-2xl font-bold text-snow">Profile</h2>
            <article className="mt-5 rounded-2xl border border-white/10 bg-[#1a1a2e] p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3366] font-display text-lg font-bold text-white">
                    AK
                  </span>
                  <div>
                    <p className="font-display text-xl font-bold text-snow">Arjun Kumar</p>
                    <p className="text-sm text-fog">Photographer · Hyderabad</p>
                    <p className="mt-1 text-sm text-snow">
                      ⭐ 4.9 <span className="text-fog">(18 reviews)</span>
                    </p>
                  </div>
                </div>
                <p className="inline-flex items-center gap-2 self-start rounded-full bg-[#22c55e]/15 px-3 py-1 text-sm font-semibold text-[#22c55e]">
                  <span aria-hidden="true">🟢</span> Active
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-[#0d0d0d] px-3 py-1 text-xs font-semibold text-snow">
                  ✓ Identity Verified
                </span>
                <span className="rounded-full border border-white/10 bg-[#0d0d0d] px-3 py-1 text-xs font-semibold text-snow">
                  ✓ Skill Verified
                </span>
              </div>
              <Button type="button" variant="ghost" className="mt-6 px-2">
                Edit Profile
              </Button>
            </article>
          </section>
        </div>
      </motion.main>
    </Layout>
  )
}
