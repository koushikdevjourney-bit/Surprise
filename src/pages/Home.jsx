import { motion } from 'framer-motion'
import Button from '../components/Button'
import ExperienceCard from '../components/ExperienceCard'
import Layout from '../components/Layout'
import { experiences } from '../data/experiences'

const emotions = [
  { emoji: '🎂', label: 'Birthday chaos' },
  { emoji: '💌', label: 'Secret crush' },
  { emoji: '😂', label: 'Best-friend roast' },
  { emoji: '💍', label: 'The big yes' },
  { emoji: '🌍', label: 'NRI magic' },
  { emoji: '🌙', label: 'Midnight drop' },
]

const featured = experiences.filter((item) =>
  ['birthday-raid', 'romantic-surprise', 'bollywood-moment', 'nri-love-package', 'midnight-mission', 'proposal-setup'].includes(
    item.id,
  ),
)

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

        <section className="border-y border-line bg-void">
          <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-5 py-5">
            {emotions.map((item) => (
              <div
                key={item.label}
                className="shrink-0 rounded-full border border-line bg-panel px-4 py-2 font-ui text-sm text-snow"
              >
                <span aria-hidden="true">{item.emoji}</span> {item.label}
              </div>
            ))}
          </div>
        </section>

        <section id="experiences" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-xl font-display text-3xl font-bold text-snow sm:text-4xl">
            Highlight missions
          </h2>
          <p className="mt-3 max-w-lg text-fog">Pick a vibe. Customize it. Launch it.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ExperienceCard key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-8">
            <Button to="/experiences" variant="secondary">
              See all experiences
            </Button>
          </div>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold text-snow sm:text-4xl">How the mission lands</h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: '01', t: 'Lock the Target', d: 'Who, city, relationship.' },
                { n: '02', t: 'Pick the Experience', d: 'Raid, roast, romance, or NRI magic.' },
                { n: '03', t: 'Add the Magic', d: 'Message + notes for the crew.' },
                { n: '04', t: 'Launch', d: 'We make the moment happen.' },
              ].map((step) => (
                <li key={step.n} className="rounded-2xl border border-line bg-panel p-6">
                  <p className="text-sm font-semibold text-pink-hot">{step.n}</p>
                  <h3 className="mt-3 font-display text-xl text-snow">{step.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-pink/25 to-mood-anonymous/20 px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to make someone&apos;s day?</h2>
            <p className="mx-auto mt-4 max-w-md text-fog">Create a surprise they&apos;ll never see coming.</p>
            <Button to="/create-surprise" className="mt-8 px-6 py-3">
              Create Surprise
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
