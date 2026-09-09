import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import ProgressSteps from '../components/create-surprise/ProgressSteps'
import StepAccepted from '../components/create-surprise/StepAccepted'
import StepBriefing from '../components/create-surprise/StepBriefing'
import StepExperience from '../components/create-surprise/StepExperience'
import StepOccasion from '../components/create-surprise/StepOccasion'
import StepPayment from '../components/create-surprise/StepPayment'
import StepPersonalize from '../components/create-surprise/StepPersonalize'
import StepRecipient from '../components/create-surprise/StepRecipient'
import StepReview from '../components/create-surprise/StepReview'
import StepWhenWhere from '../components/create-surprise/StepWhenWhere'
import FloatingCta from '../components/FloatingCta'
import SocialToasts from '../components/SocialToasts'
import { experiences } from '../data/experiences'
import {
  clearPlannerPlan,
  emptyForm,
  formFromPlan,
  generateBookingId,
  loadDraft,
  loadPlannerPlan,
  saveBooking,
  saveDraft,
} from '../lib/booking'

function initialForm(searchParams, locationState) {
  const draft = loadDraft() ?? emptyForm
  const plan = locationState?.plan ?? loadPlannerPlan()
  const fromPlan = formFromPlan(plan)
  if (plan) clearPlannerPlan()
  const merged = { ...emptyForm, ...draft, ...fromPlan }

  const experienceId = searchParams.get('experience') || locationState?.experienceId
  if (experienceId && experiences.some((item) => item.id === experienceId)) {
    return { ...merged, experienceId }
  }
  return merged
}

export default function CreateSurprise() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => initialForm(searchParams, location.state))
  const [booking, setBooking] = useState(null)

  function updateForm(partial) {
    setForm((current) => {
      const next = { ...current, ...partial }
      saveDraft(next)
      return next
    })
  }

  function goTo(nextStep) {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handlePaid() {
    const next = { ...form, id: generateBookingId() }
    saveDraft(form)
    saveBooking(next)
    setBooking(next)
    goTo(9)
  }

  return (
    <div className="min-h-svh bg-ink pb-24">
      <header className="border-b border-line/80 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-xl font-extrabold text-snow sm:text-2xl">
            Surprise <span aria-hidden="true">🎯</span>
          </Link>
          <p className="font-ui text-sm font-semibold text-fog sm:text-base">Create Surprise</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-6 sm:py-8">
        <ProgressSteps current={step} />
      </div>

      <main className="mx-auto max-w-3xl px-5 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {step === 1 ? (
              <StepRecipient data={form} onChange={updateForm} onContinue={() => goTo(2)} />
            ) : null}
            {step === 2 ? (
              <StepOccasion
                data={form}
                onChange={updateForm}
                onBack={() => goTo(1)}
                onContinue={() => goTo(3)}
              />
            ) : null}
            {step === 3 ? (
              <StepExperience
                data={form}
                onChange={updateForm}
                onBack={() => goTo(2)}
                onContinue={() => goTo(4)}
              />
            ) : null}
            {step === 4 ? (
              <StepPersonalize
                data={form}
                onChange={updateForm}
                onBack={() => goTo(3)}
                onContinue={() => goTo(5)}
              />
            ) : null}
            {step === 5 ? (
              <StepWhenWhere
                data={form}
                onChange={updateForm}
                onBack={() => goTo(4)}
                onContinue={() => goTo(6)}
              />
            ) : null}
            {step === 6 ? (
              <StepReview data={form} onEdit={goTo} onBack={() => goTo(5)} onContinue={() => goTo(7)} />
            ) : null}
            {step === 7 ? (
              <StepBriefing data={form} onEdit={goTo} onBack={() => goTo(6)} onContinue={() => goTo(8)} />
            ) : null}
            {step === 8 ? <StepPayment data={form} onBack={() => goTo(7)} onPaid={handlePaid} /> : null}
            {step === 9 && booking ? <StepAccepted booking={booking} /> : null}
          </motion.div>
        </AnimatePresence>
      </main>
      <SocialToasts />
      <FloatingCta />
    </div>
  )
}
