import Button from '../components/Button'
import Layout from '../components/Layout'
import { howItWorksSteps } from '../data/howItWorks'

export default function HowItWorks() {
  return (
    <Layout>
      <main>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold text-snow sm:text-5xl">How it works</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
            Six beats from “I wish I could be there” to a moment they won&apos;t forget.
          </p>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-line bg-panel p-6">
                <p className="text-sm font-semibold text-pink-hot">{step.number}</p>
                <h2 className="mt-3 font-display text-xl text-snow">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <h2 className="font-display text-3xl font-bold leading-snug text-snow sm:text-4xl">
              Distance shouldn&apos;t keep you out of the moment.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fog sm:text-lg">
              Create a surprise in a few minutes. The Surprise Crew takes it from there.
            </p>
            <Button to="/create-surprise" className="mt-8 px-6 py-3">
              Create Surprise
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  )
}
