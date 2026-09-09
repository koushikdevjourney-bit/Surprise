import Button from '../components/Button'
import ExperienceCard from '../components/ExperienceCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { experiences } from '../data/experiences'

export default function Experiences() {
  return (
    <div className="min-h-svh bg-ivory">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="font-display text-4xl font-medium text-charcoal sm:text-5xl">Experiences</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Pick how you want the moment to feel. Each one can start a surprise with that experience already selected.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item) => (
            <div key={item.id} className="flex flex-col">
              <ExperienceCard {...item} />
              <Button
                to={`/create-surprise?experience=${item.id}`}
                variant="secondary"
                className="mt-3 w-full"
              >
                Create this surprise
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
