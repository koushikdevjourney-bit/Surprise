import { motion } from 'framer-motion'
import { Check, MapPin, PartyPopper } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { experiences } from '../data/experiences'
import { occasions } from '../data/occasions'
import { formatInr } from '../lib/format'
import { emptyForm, formFromPlan, saveDraft, savePlannerPlan } from '../lib/booking'
import { mockPlan, requestSurprisePlan } from '../lib/planner'

const EXAMPLE_PROMPTS = [
  'My best friend Rahul, turning 21, loves cricket, I have ₹2000',
  'Surprise my mom in Chennai for her birthday, budget ₹3000',
  'My girlfriend in Mumbai, anniversary, she loves sunflowers, ₹1500',
  'My dad in Delhi, retirement party, loves old Bollywood music, ₹5000',
]

const LOADING_LINES = [
  'Briefing the crew... 🎯',
  'Checking vibes... ✨',
  'Calculating chaos level... 🔥',
  'Almost ready to launch... 🚀',
]

function occasionLabel(value) {
  if (!value) return 'Celebration'
  const match = occasions.find(
    (item) => item.id === value || item.label.toLowerCase() === String(value).toLowerCase(),
  )
  return match?.label ?? value
}

function arsenalItems(plan, experience) {
  const raw = plan?.arsenal ?? plan?.items ?? plan?.lineItems
  if (Array.isArray(raw) && raw.length) {
    return raw.map((item, index) => {
      if (typeof item === 'string') {
        return { name: item, price: index === 0 ? Number(plan.estimatedPrice) || 0 : 0 }
      }
      return {
        name: item.name ?? item.title ?? item.label ?? `Item ${index + 1}`,
        price: Number(item.price ?? item.amount ?? item.estimatedPrice ?? 0),
      }
    })
  }

  const total = Number(plan?.estimatedPrice ?? experience?.priceAmount ?? 0)
  const addOn = total > 500 ? 299 : Math.round(total * 0.3)
  const core = Math.max(0, total - addOn)
  return [
    { name: experience?.title ?? plan?.title ?? 'Core experience', price: core },
    { name: 'Crew setup & capture', price: addOn },
  ]
}

export default function AiPlanner() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [usedMock, setUsedMock] = useState(false)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')
  const [loadingLine, setLoadingLine] = useState(0)

  useEffect(() => {
    if (!loading) {
      setLoadingLine(0)
      return undefined
    }
    const id = setInterval(() => {
      setLoadingLine((current) => (current + 1) % LOADING_LINES.length)
    }, 1500)
    return () => clearInterval(id)
  }, [loading])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!prompt.trim() || loading) return
    setLoading(true)
    setError('')
    setUsedMock(false)
    try {
      const next = await requestSurprisePlan(prompt.trim())
      setPlan(next)
    } catch {
      setPlan({ ...mockPlan, city: mockPlan.city })
      setUsedMock(true)
      setError('')
    } finally {
      setLoading(false)
    }
  }

  function buildSurprise() {
    if (!plan) return
    savePlannerPlan(plan)
    saveDraft({ ...emptyForm, ...formFromPlan(plan) })
    navigate('/create-surprise', { state: { plan } })
  }

  const experience = experiences.find((item) => item.id === plan?.experienceId)
  const arsenal = plan ? arsenalItems(plan, experience) : []
  const total = Number(plan?.estimatedPrice ?? arsenal.reduce((sum, item) => sum + Number(item.price || 0), 0))
  const tagline = plan?.tagline || plan?.summary || experience?.description || ''

  return (
    <Layout>
      <main className="relative mx-auto min-h-[70vh] max-w-3xl px-5 py-16">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">AI Planner</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-snow sm:text-5xl">Describe the mission.</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
          Tell us who, the vibe, the city. We’ll draft a surprise plan you can launch in one tap.
        </p>

        {loading ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-2.5 w-2.5 rounded-full bg-[#FF3366]"
                  animate={{ opacity: [0.25, 1, 0.25], y: [0, -6, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.16 }}
                />
              ))}
            </div>
            <p className="mt-6 font-display text-xl font-semibold text-snow sm:text-2xl">
              {LOADING_LINES[loadingLine]}
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-8">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={5}
                placeholder="e.g. Surprise my girlfriend in Bangalore this Saturday — she’s into indie music and hates loud parties..."
                className="w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-snow outline-none placeholder:text-fog/60 focus:border-pink/50 focus:ring-2 focus:ring-pink/20"
              />
              <p className="mt-4 text-xs font-medium text-gray-400">Try an example →</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setPrompt(example)}
                    className="rounded-full border border-white/10 bg-[#16161f] px-3 py-1.5 text-left text-xs text-gray-400 transition-colors hover:border-pink-500/50 hover:text-white"
                  >
                    {example}
                  </button>
                ))}
              </div>
              <Button type="submit" disabled={!prompt.trim() || loading} className="mt-4 px-7 py-3">
                Plan this surprise
              </Button>
            </form>

            {error ? <p className="mt-4 text-sm text-pink-hot">{error}</p> : null}

            {plan ? (
              <motion.article
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 overflow-hidden rounded-3xl"
                style={{
                  background: 'linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)',
                  border: '1px solid rgba(255,51,102,0.4)',
                  boxShadow: '0 0 40px rgba(255,51,102,0.15)',
                }}
              >
                <div className="px-6 py-7 sm:px-8">
                  <p className="font-bebas text-4xl tracking-wide text-snow uppercase">
                    🎯 {plan.title}
                  </p>
                  {tagline ? (
                    <p className="mt-2 text-sm italic text-[#FF3366]">{tagline}</p>
                  ) : null}
                  {usedMock ? (
                    <p className="mt-2 text-xs text-fog">
                      Live planner is offline — showing a sample mission so you can keep going.
                    </p>
                  ) : null}

                  <div className="my-5 h-px bg-white/10" />

                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-snow">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#FF3366]" aria-hidden="true" />
                      📍 {plan.city}
                    </span>
                    <span className="text-fog">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <PartyPopper className="h-4 w-4 text-[#FF3366]" aria-hidden="true" />
                      🎉 {occasionLabel(plan.occasion)}
                    </span>
                  </p>

                  <div className="my-5 h-px bg-white/10" />

                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-fog">
                    YOUR ARSENAL
                  </p>
                  <ul className="mt-3 space-y-2">
                    {arsenal.map((item) => (
                      <li key={item.name} className="flex items-baseline gap-2 text-sm text-snow">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden="true" />
                        <span className="min-w-0">✓ {item.name}</span>
                        <span className="flex-1 border-b border-dotted border-white/20" />
                        <span className="shrink-0 tabular-nums text-fog">{formatInr(item.price)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="my-5 h-px bg-white/10" />

                  {plan.summary ? <p className="text-sm leading-relaxed text-snow">{plan.summary}</p> : null}
                  {plan.whyItWorks ? (
                    <p className="mt-4 text-sm leading-relaxed text-snow">
                      <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[#FF3366]">
                        WHY IT WORKS:{' '}
                      </span>
                      {plan.whyItWorks}
                    </p>
                  ) : null}
                  {plan.crewNotes ? (
                    <p className="mt-3 text-sm leading-relaxed text-snow">
                      <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[#FF3366]">
                        CREW NOTES:{' '}
                      </span>
                      {plan.crewNotes}
                    </p>
                  ) : null}

                  <div className="my-5 h-px bg-white/10" />

                  <p className="font-display text-3xl font-extrabold text-[#FF3366]">TOTAL: {formatInr(total)}</p>
                  <Button type="button" className="mt-5 w-full px-6 py-3" onClick={buildSurprise}>
                    BUILD THIS SURPRISE →
                  </Button>
                </div>
              </motion.article>
            ) : null}
          </>
        )}
      </main>
    </Layout>
  )
}
