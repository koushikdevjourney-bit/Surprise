import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Banknote, Bell, ClipboardList, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import { crewHowSteps, crewTypes, weeklyEarnings } from '../../data/crew'
import { formatInr } from '../../lib/format'

const heroWords = 'Turn your talent into income.'.split(' ')

const howIcons = [ClipboardList, ShieldCheck, Bell, Banknote]

const trustCards = [
  {
    emoji: '🔒',
    title: 'Identity Verified',
    body: 'Every crew member is Aadhaar-verified before their first order.',
  },
  {
    emoji: '⭐',
    title: 'Rated After Every Mission',
    body: 'Customers rate the crew. Top-rated crew get priority orders.',
  },
  {
    emoji: '💸',
    title: 'Guaranteed Payment',
    body: 'You get paid within 24 hours of completing a surprise. No delays.',
  },
]

function AnimatedAmount({ value }) {
  const motionValue = useMotionValue(value)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.45, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', (latest) => setDisplay(latest))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [motionValue, rounded, value])

  return <span className="tabular-nums text-[#22c55e]">{formatInr(display)}</span>
}

function EarningsCalculator() {
  const [orders, setOrders] = useState(3)
  const monthly = weeklyEarnings[orders]

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] p-6 sm:p-8">
      <label htmlFor="orders-per-week" className="font-ui text-sm font-semibold text-snow">
        Orders per week: <span className="text-[#FF3366]">{orders}</span>
      </label>
      <input
        id="orders-per-week"
        type="range"
        min={1}
        max={7}
        step={1}
        value={orders}
        onChange={(event) => setOrders(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#FF3366]"
      />
      <div className="mt-2 flex justify-between font-ui text-xs text-fog">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index + 1}>{index + 1}</span>
        ))}
      </div>
      <p className="mt-6 text-center font-display text-xl font-bold text-snow sm:text-2xl">
        At {orders} {orders === 1 ? 'order' : 'orders'}/week → <AnimatedAmount value={monthly} /> per month
      </p>
    </div>
  )
}

export default function CrewLanding() {
  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d0d0d]"
      >
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,51,102,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(139,108,255,0.16),transparent_36%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
            <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-pink-hot">Crew Portal</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-extrabold text-snow sm:text-6xl">
              {heroWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mr-[0.28em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              Join India&apos;s first surprise crew network. Get orders. Show up. Make someone&apos;s day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/crew/apply" className="bg-[#FF3366] px-6 py-3 hover:bg-[#ff4d7a]">
                Join the Crew →
              </Button>
              <Button href="#how-it-works" variant="ghost" className="px-6 py-3">
                See How It Works
              </Button>
            </div>
            <p className="mt-6 font-ui text-sm text-fog">
              120+ crew members • 6 cities • ₹500–₹5,000 per surprise
            </p>
            <Link
              to="/crew/dashboard"
              className="mt-4 inline-block font-ui text-xs font-semibold text-[#FF3366] underline-offset-4 hover:underline"
            >
              View Crew Dashboard (Demo)
            </Link>
          </div>
        </section>

        <section className="bg-[#0d0d0d]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">Who are we looking for?</h2>
            <p className="mt-3 max-w-xl text-fog">
              If you have a skill and a good attitude, there&apos;s a spot for you.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {crewTypes.map((type, index) => (
                <motion.article
                  key={type.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] p-5 transition-colors hover:border-pink-500/40"
                >
                  <p className="text-4xl" aria-hidden="true">
                    {type.emoji}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white">{type.role}</h3>
                  <p className="mt-1 text-sm font-medium text-green-400">{type.earning}</p>
                  <p className="mt-2 text-sm text-gray-400">{type.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-28 bg-void">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">How it works</h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {crewHowSteps.map((step, index) => {
                const Icon = howIcons[index]
                return (
                  <motion.li
                    key={step.n}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 p-[1px]"
                  >
                    <div className="h-full rounded-2xl bg-panel p-6">
                      <p className="font-bebas text-5xl tracking-wide text-pink">{step.n}</p>
                      <Icon className="mt-3 h-7 w-7 text-pink-hot" aria-hidden="true" />
                      <h3 className="mt-3 font-display text-xl font-bold text-white">{step.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fog">{step.d}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="bg-[#0d0d0d]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-center font-display text-3xl font-bold text-snow sm:text-4xl">How much can you earn?</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-fog">
              Most crew members earn ₹8,000–₹25,000/month taking 2-3 orders per week.
            </p>
            <EarningsCalculator />
          </div>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">We keep everyone safe.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] p-6"
                >
                  <p className="text-3xl" aria-hidden="true">
                    {card.emoji}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-snow">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#FF3366] to-[#ff4da6] px-5 py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">Ready to join the crew?</h2>
          <p className="mt-3 text-base text-white/85 sm:text-lg">Takes 2 minutes. First order within 7 days.</p>
          <Button
            to="/crew/apply"
            className="mt-8 bg-white px-8 py-3.5 text-[#FF3366] shadow-none hover:bg-snow hover:text-[#FF3366]"
          >
            Apply Now →
          </Button>
        </section>
      </motion.main>
    </Layout>
  )
}
