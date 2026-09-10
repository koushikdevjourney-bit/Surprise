import Button from '../components/Button'
import CinematicVideo from '../components/CinematicVideo'
import Layout from '../components/Layout'
import { videos } from '../data/videos'

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
          <CinematicVideo
            eager
            src={videos.emotional.src}
            poster={videos.emotional.poster}
            label={videos.emotional.label}
            className="min-h-[560px]"
            overlay="bg-gradient-to-r from-[#07070b] via-[#07070b]/75 to-[#07070b]/25"
          >
            <div className="mx-auto flex min-h-[560px] max-w-6xl items-center px-5 py-20">
              <div className="max-w-xl">
                <p className="font-ui text-xs font-semibold tracking-[0.16em] text-pink-hot">
                  FOR INDIANS ABROAD
                </p>
                <h1 className="mt-3 font-display text-4xl font-extrabold text-snow sm:text-6xl">
                  Miss them? Surprise them.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
                  Send real experiences to your family in India — from anywhere in the world.
                </p>
                <Button to="/create-surprise" className="mt-8 px-6 py-3">
                  Surprise Someone in India →
                </Button>
              </div>
            </div>
          </CinematicVideo>
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
