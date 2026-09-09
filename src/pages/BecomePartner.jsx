import { useState } from 'react'
import Button from '../components/Button'
import FlowField from '../components/create-surprise/FlowField'
import Layout from '../components/Layout'

const roles = ['Singers', 'Dancers', 'Photographers', 'Drivers', 'Cake shops', 'Florists', 'Surprise crew members']

const steps = [
  { n: '01', t: 'Apply', d: 'Tell us your city and skill.' },
  { n: '02', t: 'Get verified', d: 'Background-checked before you go live.' },
  { n: '03', t: 'Get missions', d: 'Gigs land in your city when a surprise launches.' },
  { n: '04', t: 'Get paid', d: 'Earn per surprise — no guesswork.' },
]

export default function BecomePartner() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    skill: '',
    phone: '',
    portfolio: '',
  })
  const [done, setDone] = useState(false)

  const valid = form.name.trim() && form.city.trim() && form.skill.trim() && form.phone.trim()

  function handleSubmit(event) {
    event.preventDefault()
    if (!valid) return
    setDone(true)
  }

  return (
    <Layout>
      <main>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold text-snow sm:text-5xl">
            Turn your talent into income. Join the Surprise Network.
          </h1>
          <p className="mt-4 max-w-xl text-fog">
            We need people who can make a stranger’s day in under 30 minutes.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-12">
          <h2 className="font-display text-2xl font-bold text-snow">Who we need</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {roles.map((role) => (
              <span key={role} className="rounded-full border border-line bg-panel px-4 py-2 text-sm text-snow">
                {role}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-void">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="font-display text-2xl font-bold text-snow">How it works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.n} className="rounded-2xl border border-line bg-panel p-5">
                  <p className="text-sm font-semibold text-pink-hot">{step.n}</p>
                  <p className="mt-2 font-display text-xl text-snow">{step.t}</p>
                  <p className="mt-2 text-sm text-fog">{step.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-display text-2xl text-pink-hot">Earn ₹500–₹5,000 per surprise</p>
            <p className="mt-2 inline-flex rounded-full bg-mood-nri/15 px-3 py-1 text-xs font-semibold text-mood-nri">
              Background verified
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-lg px-5 py-16">
          <h2 className="font-display text-3xl font-bold text-snow">Apply to the network</h2>
          {done ? (
            <div className="mt-8 rounded-2xl border border-mood-nri/40 bg-panel p-6">
              <p className="font-display text-2xl text-snow">Application in. You’re on the list.</p>
              <p className="mt-2 text-sm text-fog">
                This is a prototype — no backend yet. In the real network we’d verify you next.
              </p>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <FlowField
                id="partner-name"
                label="Name"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <FlowField
                id="partner-city"
                label="City"
                required
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
              />
              <FlowField
                id="partner-skill"
                label="Skill / Service"
                required
                value={form.skill}
                onChange={(event) => setForm({ ...form, skill: event.target.value })}
                placeholder="Singer, florist, driver…"
              />
              <FlowField
                id="partner-phone"
                label="Phone"
                required
                type="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
              <FlowField
                id="partner-portfolio"
                label="Instagram / Portfolio"
                value={form.portfolio}
                onChange={(event) => setForm({ ...form, portfolio: event.target.value })}
                placeholder="@yourhandle or a link"
              />
              <Button type="submit" disabled={!valid} className="w-full px-7 py-3">
                Submit application
              </Button>
            </form>
          )}
        </section>
      </main>
    </Layout>
  )
}
