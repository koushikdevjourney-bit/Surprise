import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import ProgressSteps from '../components/create-surprise/ProgressSteps'
import StepAccepted from '../components/create-surprise/StepAccepted'
import StepBriefing from '../components/create-surprise/StepBriefing'
import StepOccasion from '../components/create-surprise/StepOccasion'
import StepSurpriseBuilder from '../components/create-surprise/StepSurpriseBuilder'
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
import { builderFromExperience, normalizeBuilder } from '../lib/builder'

function initialForm(searchParams, locationState) {
  const draft = loadDraft() ?? emptyForm
  const plan = locationState?.plan ?? loadPlannerPlan()
  const fromPlan = formFromPlan(plan)
  if (plan) clearPlannerPlan()
  const merged = { ...emptyForm, ...draft, ...fromPlan }
  merged.builder = normalizeBuilder(merged.builder)
  if (!merged.builder.crewId && merged.experienceId && merged.experienceId !== 'custom-build') {
    merged.builder = builderFromExperience(merged.experienceId)
  }

  const mood = searchParams.get('mood')
  if (mood) {
    sessionStorage.setItem('surprise.mood', mood)
  }

  const type = searchParams.get('type')
  if (type) {
    sessionStorage.setItem('surprise.type', type)
  }

  const experienceId = searchParams.get('experience') || locationState?.experienceId
  if (experienceId && experiences.some((item) => item.id === experienceId)) {
    return {
      ...merged,
      experienceId,
      mood: mood || merged.mood,
      builder: merged.builder?.crewId ? merged.builder : builderFromExperience(experienceId),
    }
  }
  if (type === 'group' && experiences.some((item) => item.id === 'squad-pooled')) {
    return {
      ...merged,
      experienceId: 'squad-pooled',
      mood: mood || merged.mood,
      builder: merged.builder?.crewId ? merged.builder : builderFromExperience('squad-pooled'),
    }
  }
  return mood ? { ...merged, mood } : merged
}

const STEP_FLASHES = {
  1: 'Target locked. 🎯',
  2: 'Occasion noted. Let’s build this. ✨',
  3: 'Mission built. Adding the magic... 🔥',
  4: 'Perfect. When does this go down? 🕐',
  5: 'Almost there. Review your mission. 🚀',
}

export default function CreateSurprise() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => initialForm(searchParams, location.state))
  const [booking, setBooking] = useState(null)
  const [flash, setFlash] = useState(null)
  const pendingStep = useRef(null)
  const flashTimer = useRef(null)

  function updateForm(partial) {
    setForm((current) => {
      const next = { ...current, ...partial }
      saveDraft(next)
      return next
    })
  }

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [])

  function goTo(nextStep) {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function advanceTo(nextStep) {
    const message = nextStep > step ? STEP_FLASHES[step] : null
    if (!message) {
      goTo(nextStep)
      return
    }
    if (flashTimer.current) clearTimeout(flashTimer.current)
    pendingStep.current = nextStep
    setFlash(message)
    flashTimer.current = setTimeout(() => {
      setFlash(null)
      flashTimer.current = setTimeout(() => {
        const dest = pendingStep.current
        pendingStep.current = null
        if (dest != null) goTo(dest)
      }, 200)
    }, 600)
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
        <div className={`mx-auto flex items-center justify-between gap-4 px-5 py-4 ${step === 3 ? 'max-w-6xl' : 'max-w-3xl'}`}>
          <Link to="/" className="font-display text-xl font-extrabold text-snow sm:text-2xl">
            Surprise <span aria-hidden="true">🎯</span>
          </Link>
          <p className="font-ui text-sm font-semibold text-fog sm:text-base">Create Surprise</p>
        </div>
      </header>

      <div className={`mx-auto px-5 py-6 sm:py-8 ${step === 3 ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <ProgressSteps current={step} />
      </div>

      <main className={`mx-auto px-5 pb-16 ${step === 3 ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={step === 3 ? { opacity: 0 } : { opacity: 0, x: 50 }}
            animate={
              step === 3
                ? { opacity: 1, transition: { duration: 0.3 } }
                : { opacity: 1, x: 0, transition: { duration: 0.3 } }
            }
            exit={step === 3 ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 0, x: -50, transition: { duration: 0.25 } }}
          >
            {step === 1 ? (
              <StepRecipient data={form} onChange={updateForm} onContinue={() => advanceTo(2)} />
            ) : null}
            {step === 2 ? (
              <StepOccasion
                data={form}
                onChange={updateForm}
                onBack={() => goTo(1)}
                onContinue={() => advanceTo(3)}
              />
            ) : null}
            {step === 3 ? (
              <StepSurpriseBuilder
                data={form}
                onChange={updateForm}
                onBack={() => goTo(2)}
                onContinue={() => advanceTo(4)}
              />
            ) : null}
            {step === 4 ? (
              <StepPersonalize
                data={form}
                onChange={updateForm}
                onBack={() => goTo(3)}
                onContinue={() => advanceTo(5)}
              />
            ) : null}
            {step === 5 ? (
              <StepWhenWhere
                data={form}
                onChange={updateForm}
                onBack={() => goTo(4)}
                onContinue={() => advanceTo(6)}
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
      {step === 3 ? null : <FloatingCta />}
      <AnimatePresence>
        {flash ? (
          <motion.div
            key={flash}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D1A]/95 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-center text-3xl font-bold text-white">{flash}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
