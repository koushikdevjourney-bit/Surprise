import Button from '../components/Button'
import ExperienceCard from '../components/ExperienceCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { experiences } from '../data/experiences'

const steps = [
  {
    number: '01',
    title: 'Choose someone',
    description: 'Tell us who you want to surprise.',
  },
  {
    number: '02',
    title: 'Pick an experience',
    description: 'Choose how you want to make their day.',
  },
  {
    number: '03',
    title: 'Make it personal',
    description: 'Add their likes, your message and special instructions.',
  },
  {
    number: '04',
    title: 'We make it happen',
    description: 'Our local team takes care of the surprise.',
  },
]

function CityCard({ city, caption, align = 'left' }) {
  return (
    <div className="rounded-2xl border border-sand bg-card p-5 shadow-sm">
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-terracotta ${align === 'right' ? 'text-right' : ''}`}>
        {caption}
      </p>
      <p className={`mt-2 font-display text-2xl text-charcoal ${align === 'right' ? 'text-right' : ''}`}>{city}</p>
      <div className="mt-5 flex h-20 items-end gap-1.5 overflow-hidden rounded-xl bg-cream px-3 pb-0">
        <span className="h-10 w-4 rounded-t-sm bg-sand" />
        <span className="h-16 w-5 rounded-t-sm bg-terracotta/25" />
        <span className="h-8 w-3 rounded-t-sm bg-sand" />
        <span className="h-14 w-6 rounded-t-md bg-charcoal/15" />
        <span className="h-9 w-4 rounded-t-sm bg-terracotta/40" />
        <span className="h-12 w-5 rounded-t-sm bg-sand" />
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-4 top-6 hidden h-16 w-16 rounded-full bg-terracotta/10 sm:block" />
      <div className="absolute -right-3 bottom-10 hidden h-12 w-12 rounded-full bg-sand sm:block" />

      <div className="relative space-y-4">
        <CityCard city="Hyderabad" caption="You're here" />

        <div className="flex items-center gap-3 px-2">
          <span className="h-px flex-1 bg-sand" />
          <div className="rounded-full border border-sand bg-white px-3 py-1.5 text-center shadow-sm">
            <p className="text-xs font-semibold text-terracotta">Surprise on the way</p>
            <p className="text-[11px] text-muted">Gift · note · local team</p>
          </div>
          <span className="h-px flex-1 bg-sand" />
        </div>

        <CityCard city="Mumbai" caption="They're there" align="right" />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">For the ones you miss</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.15] font-medium text-charcoal sm:text-5xl lg:text-[3.4rem]">
              You don&apos;t have to be there
              <br />
              to make them feel special.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Create unforgettable surprises for the people you love — even when you&apos;re miles apart.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/create-surprise" className="px-6 py-3">
                Create a Surprise
              </Button>
              <Button href="#experiences" variant="secondary" className="px-6 py-3">
                Explore Experiences
              </Button>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className="bg-cream">
          <div className="mx-auto max-w-4xl px-5 py-16 md:py-20">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-2xl border border-sand bg-card p-6 text-center shadow-sm">
                <p className="font-display text-2xl text-charcoal">Hyderabad</p>
                <p className="mt-1 text-sm text-muted">You&apos;re here</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="hidden h-8 w-px bg-terracotta/40 md:block" />
                <span className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white">
                  Send a surprise
                </span>
                <span className="hidden h-8 w-px bg-terracotta/40 md:block" />
              </div>

              <div className="rounded-2xl border border-sand bg-card p-6 text-center shadow-sm">
                <p className="font-display text-2xl text-charcoal">Mumbai</p>
                <p className="mt-1 text-sm text-muted">They&apos;re there</p>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-muted">Distance, solved — one thoughtful moment at a time.</p>
          </div>
        </section>

        <section id="experiences" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-xl font-display text-3xl font-medium text-charcoal sm:text-4xl">
            Choose how you want to surprise them
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item) => (
              <ExperienceCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">From idea to unforgettable</h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.number} className="rounded-2xl border border-sand bg-card p-6">
                  <p className="text-sm font-semibold text-terracotta">{step.number}</p>
                  <h3 className="mt-3 font-display text-xl text-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl font-medium leading-snug text-charcoal sm:text-4xl">
            Distance shouldn&apos;t stop you from being part of their special moments.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Whether they&apos;re across the street or across the country, we&apos;ll help you create a moment they&apos;ll remember.
          </p>
          <Button to="/create-surprise" className="mt-8 px-6 py-3">
            Create a Surprise
          </Button>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-charcoal px-6 py-14 text-center text-ivory sm:px-12">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">Ready to make someone&apos;s day?</h2>
            <p className="mx-auto mt-4 max-w-md text-sand">Create a surprise they&apos;ll never see coming.</p>
            <Button to="/create-surprise" className="mt-8 bg-terracotta px-6 py-3 hover:bg-terracotta-dark">
              Create a Surprise
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
