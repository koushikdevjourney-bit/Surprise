import Button from '../components/Button'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { howItWorksSteps } from '../data/howItWorks'

export default function HowItWorks() {
  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h1 className="font-display text-4xl font-medium text-charcoal sm:text-5xl">How it works</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Six simple steps from “I wish I could be there” to a moment they won’t forget.
          </p>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-sand bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold text-terracotta">{step.number}</p>
                <h2 className="mt-3 font-display text-xl text-charcoal">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <h2 className="font-display text-3xl font-medium leading-snug text-charcoal sm:text-4xl">
              Distance shouldn&apos;t keep you out of the moment.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Create a surprise in a few minutes. Our local team takes it from there.
            </p>
            <Button to="/create-surprise" className="mt-8 px-6 py-3">
              Create a Surprise
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
