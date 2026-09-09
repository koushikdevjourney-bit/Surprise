import { motion } from 'framer-motion'
import { Crosshair, Rocket, Sparkles, Wand2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ExperienceCard from '../components/ExperienceCard'
import GroupSurpriseBanner from '../components/GroupSurpriseBanner'
import Layout from '../components/Layout'
import { experiences } from '../data/experiences'

const emotions = [
  { slug: 'loved', emoji: '❤️', label: 'Loved', glow: 'hover:shadow-[0_0_28px_rgba(255,45,138,0.55)] hover:border-pink' },
  { slug: 'laughing', emoji: '😂', label: 'Laughing', glow: 'hover:shadow-[0_0_28px_rgba(255,183,3,0.5)] hover:border-mood-funny' },
  { slug: 'emotional', emoji: '😭', label: 'Emotional', glow: 'hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] hover:border-blue-400' },
  { slug: 'shocked', emoji: '😱', label: 'Shocked', glow: 'hover:shadow-[0_0_28px_rgba(255,138,61,0.5)] hover:border-orange-400' },
  { slug: 'celebrated', emoji: '🎉', label: 'Celebrated', glow: 'hover:shadow-[0_0_28px_rgba(139,108,255,0.5)] hover:border-mood-anonymous' },
  { slug: 'speechless', emoji: '🤯', label: 'Speechless', glow: 'hover:shadow-[0_0_28px_rgba(255,59,59,0.5)] hover:border-red-500' },
]

const featured = experiences.filter((item) =>
  ['birthday-raid', 'romantic-surprise', 'bollywood-moment', 'nri-love-package', 'midnight-mission', 'proposal-setup'].includes(
    item.id,
  ),
)

const cardGlow = {
  'birthday-raid': '0 20px 40px rgba(255,51,102,0.3)',
  'midnight-mission': '0 20px 40px rgba(139,108,255,0.35)',
  'romantic-surprise': '0 20px 40px rgba(255,51,80,0.35)',
  'bollywood-moment': '0 20px 40px rgba(232,195,106,0.3)',
  'nri-love-package': '0 20px 40px rgba(46,230,182,0.3)',
  'proposal-setup': '0 20px 40px rgba(255,51,80,0.3)',
}

const howSteps = [
  {
    n: '01',
    Icon: Crosshair,
    t: 'Lock the Target',
    d: 'Name, city, relationship. Tell us who gets the magic — even if you are miles away.',
  },
  {
    n: '02',
    Icon: Sparkles,
    t: 'Pick the Experience',
    d: 'Birthday Raid, Midnight Mission, Bollywood drop — choose the vibe that fits the moment.',
  },
  {
    n: '03',
    Icon: Wand2,
    t: 'Add the Magic',
    d: 'A personal message plus notes for the Surprise Crew. Tiny details, huge impact.',
  },
  {
    n: '04',
    Icon: Rocket,
    t: 'Launch the Mission',
    d: 'We brief a local crew. You stay wherever you are. They feel you in the room.',
  },
]

const reactions = [
  { text: 'bro she literally started crying omg 😭😭😭', time: '9:14 PM' },
  { text: 'WHAT IS THIS I AM SHAKING 🤯', time: '11:03 PM' },
  { text: 'best birthday of my life, tell me who sent this', time: '6:42 PM' },
  { text: 'my roommates just barged in with a cake and flowers I\'M DEAD 😂', time: '8:21 PM' },
  { text: 'she said yes 💍🥹 the setup was PERFECT', time: '7:58 PM' },
  { text: 'mom called me 6 times crying, worth every rupee', time: '10:06 PM' },
]

const nriFlags = [
  { flag: '🇺🇸', label: 'USA' },
  { flag: '🇬🇧', label: 'UK' },
  { flag: '🇨🇦', label: 'Canada' },
  { flag: '🇦🇺', label: 'Australia' },
  { flag: '🇦🇪', label: 'Dubai' },
  { flag: '🇸🇬', label: 'Singapore' },
]

export default function Home() {
  return (
    <Layout>
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,138,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(139,108,255,0.18),transparent_36%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-pink-hot">
                India&apos;s surprise network
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.08] font-extrabold text-snow sm:text-6xl">
                You don&apos;t have to be there.
                <span className="block text-pink-hot">Launch the moment anyway.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-fog sm:text-lg">
                Send a real experience — cake raids, midnight missions, Bollywood drops — through a Surprise Crew
                in their city. You stay wherever. They get the magic.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/create-surprise" className="px-6 py-3">
                  Create Surprise
                </Button>
                <Button href="#experiences" variant="secondary" className="px-6 py-3">
                  Browse Experiences
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="rounded-3xl border border-pink/30 bg-panel/80 p-6 shadow-[0_0_80px_rgba(255,45,138,0.15)] backdrop-blur">
                <p className="font-bebas text-4xl tracking-wide text-snow">YOU → CREW → THEM</p>
                <div className="mt-6 grid gap-3">
                  <CityChip caption="You&apos;re here" city="Anywhere" />
                  <div className="rounded-full border border-line bg-raised px-4 py-2 text-center text-xs font-semibold text-pink-hot">
                    Mission in flight 🚀
                  </div>
                  <CityChip caption="They&apos;re there" city="Mumbai" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="text-center font-display text-2xl font-bold text-snow sm:text-3xl">
              What do you want them to feel?
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {emotions.map((item) => (
                <Link
                  key={item.slug}
                  to={`/create?mood=${item.slug}`}
                  className={`flex h-[120px] flex-col items-center justify-center rounded-2xl border border-line bg-panel transition-shadow ${item.glow}`}
                >
                  <span className="text-5xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <span className="mt-2 font-ui text-sm font-semibold text-snow">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="experiences" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-xl font-display text-3xl font-bold text-snow sm:text-4xl">
            Highlight missions
          </h2>
          <p className="mt-3 max-w-lg text-fog">Pick a vibe. Customize it. Launch it.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <motion.div
                key={item.id}
                className="h-full"
                whileHover={{
                  y: -6,
                  boxShadow: cardGlow[item.id] ?? '0 20px 40px rgba(255,51,102,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ExperienceCard {...item} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Button to="/experiences" variant="secondary">
              See all experiences
            </Button>
          </div>
        </section>

        <GroupSurpriseBanner />

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">Real reactions. Real moments.</h2>
            <p className="mt-3 text-fog">Don&apos;t take our word for it.</p>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {reactions.map((item) => (
                <article key={item.text} className="overflow-hidden rounded-2xl border border-line shadow-lg">
                  <div className="bg-[#075E54] px-3 py-2">
                    <p className="font-ui text-[11px] font-semibold tracking-wide text-white/90">WhatsApp</p>
                  </div>
                  <div className="bg-[#111b21] p-3">
                    <div className="rounded-lg bg-white px-3 py-2.5 text-left shadow-sm">
                      <p className="text-sm leading-relaxed text-[#111b21]">{item.text}</p>
                      <p className="mt-2 text-right text-[10px] text-[#667781]">{item.time}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-fog">
              Reactions captured by our crew. Names hidden to protect the surprised. 🤫
            </p>
          </div>
        </section>

        <section
          className="border-y border-pink bg-gradient-to-r from-[#1a1a2e] to-[#0d0d0d]"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2">
            <div>
              <p className="font-ui text-xs font-semibold tracking-[0.16em] text-pink-hot">
                🌍 FOR INDIANS ABROAD
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-snow sm:text-4xl">
                Miss them? Surprise them.
              </h2>
              <p className="mt-3 max-w-md text-fog">
                Send real experiences to your family in India — from USA, UK, Canada, Dubai, Singapore.
              </p>
              <Button to="/nri" className="mt-6 px-6 py-3">
                Surprise Someone in India →
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {nriFlags.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-2xl border border-line/70 bg-panel/60 px-3 py-4"
                >
                  <span className="text-3xl" aria-hidden="true">
                    {item.flag}
                  </span>
                  <span className="mt-2 font-ui text-xs font-semibold text-fog">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">How the mission lands</h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {howSteps.map((step, index) => (
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
                    <step.Icon className="mt-3 h-7 w-7 text-pink-hot" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl font-bold text-white">{step.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{step.d}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-pink/25 to-mood-anonymous/20 px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Some moments are worth showing up for.
              <span className="mt-2 block">Even when you can&apos;t.</span>
            </h2>
            <Button to="/create-surprise" className="mt-8 px-6 py-3">
              Plan a Surprise
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  )
}

function CityChip({ city, caption }) {
  return (
    <div className="rounded-2xl border border-line bg-raised p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pink-hot">{caption}</p>
      <p className="mt-1 font-display text-2xl text-snow">{city}</p>
    </div>
  )
}
