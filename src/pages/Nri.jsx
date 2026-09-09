import Button from '../components/Button'
import Layout from '../components/Layout'

const features = [
  'International card payments',
  'WhatsApp updates in your timezone',
  'Your family will think you’re magic',
  'Available in 12 Indian cities',
]

const quotes = [
  {
    quote: 'Surprised my mom in Chennai from Toronto. She cried for 20 minutes. Worth every penny.',
    name: 'Karthik, Canada',
  },
  {
    quote: 'Sent a birthday raid to my best friend in Hyderabad from Dubai. He still talks about it.',
    name: 'Fatima, UAE',
  },
]

export default function Nri() {
  return (
    <Layout>
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(46,230,182,0.16),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(255,45,138,0.18),transparent_36%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-20">
            <h1 className="font-display text-4xl font-extrabold text-snow sm:text-6xl">
              Miss them? Surprise them. 🇮🇳
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              Send real experiences to your family in India — from anywhere in the world.
            </p>
            <Button to="/create-surprise" className="mt-8 px-6 py-3">
              Surprise Someone in India →
            </Button>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-2">
          {features.map((item) => (
            <div key={item} className="rounded-2xl border border-mood-nri/40 bg-panel p-6">
              <p className="font-display text-xl text-snow">{item}</p>
            </div>
          ))}
        </section>

        <section className="bg-void">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 py-16 md:grid-cols-2">
            {quotes.map((item) => (
              <blockquote key={item.name} className="rounded-2xl border border-line bg-panel p-6">
                <p className="text-base leading-relaxed text-snow">“{item.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-pink-hot">— {item.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl font-bold text-snow">Distance is just logistics.</h2>
          <p className="mt-3 text-fog">You launch. The Surprise Crew shows up. They feel you in the room.</p>
          <Button to="/create-surprise" className="mt-8 px-6 py-3">
            Surprise Someone in India →
          </Button>
        </section>
      </main>
    </Layout>
  )
}
