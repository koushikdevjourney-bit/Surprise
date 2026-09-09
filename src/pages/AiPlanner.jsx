import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { experiences } from '../data/experiences'
import { formatInr } from '../lib/format'
import { emptyForm, formFromPlan, saveDraft, savePlannerPlan } from '../lib/booking'
import { mockPlan, requestSurprisePlan } from '../lib/planner'

export default function AiPlanner() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [usedMock, setUsedMock] = useState(false)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')

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

  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">AI Planner</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-snow sm:text-5xl">Describe the mission.</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">
          Tell us who, the vibe, the city. We’ll draft a surprise plan you can launch in one tap.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={5}
            placeholder="e.g. Surprise my girlfriend in Bangalore this Saturday — she’s into indie music and hates loud parties..."
            className="w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-snow outline-none placeholder:text-fog/60 focus:border-pink/50 focus:ring-2 focus:ring-pink/20"
          />
          <Button type="submit" disabled={!prompt.trim() || loading} className="mt-4 px-7 py-3">
            {loading ? 'Planning…' : 'Plan this surprise'}
          </Button>
        </form>

        {error ? <p className="mt-4 text-sm text-pink-hot">{error}</p> : null}

        {plan ? (
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-10 overflow-hidden rounded-3xl border bg-panel mood-border-${experience?.mood ?? 'birthday'}`}
          >
            <div className="bg-gradient-to-br from-pink/20 to-transparent px-6 py-7 sm:px-8">
              <p className="font-bebas text-4xl tracking-wide text-snow">{plan.title}</p>
              <p className="mt-2 text-sm text-pink-hot">
                {experience?.emoji} {experience?.title ?? plan.experienceId} · {plan.city}
              </p>
              {usedMock ? (
                <p className="mt-2 text-xs text-fog">Live planner is offline — showing a sample mission so you can keep going.</p>
              ) : null}
            </div>
            <div className="space-y-4 px-6 py-6 sm:px-8">
              <PlanRow label="Occasion" value={plan.occasion} />
              <PlanRow label="Estimated price" value={formatInr(plan.estimatedPrice)} />
              <PlanRow label="Summary" value={plan.summary} />
              <PlanRow label="Why it works" value={plan.whyItWorks} />
              <PlanRow label="Crew notes" value={plan.crewNotes} />
              <Button type="button" className="mt-2 w-full px-6 py-3 sm:w-auto" onClick={buildSurprise}>
                Build This Surprise
              </Button>
            </div>
          </motion.article>
        ) : null}
      </main>
    </Layout>
  )
}

function PlanRow({ label, value }) {
  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-fog">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-snow">{value}</p>
    </div>
  )
}
