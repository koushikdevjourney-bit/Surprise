import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ProgressSteps from '../components/create-surprise/ProgressSteps'
import StepExperience from '../components/create-surprise/StepExperience'
import StepOccasion from '../components/create-surprise/StepOccasion'
import StepPersonalize from '../components/create-surprise/StepPersonalize'
import StepRecipient from '../components/create-surprise/StepRecipient'
import StepReview from '../components/create-surprise/StepReview'
import StepWhenWhere from '../components/create-surprise/StepWhenWhere'
import { experiences } from '../data/experiences'
import { loadDraft, saveDraft } from '../lib/booking'

const emptyForm = {
  recipientName: '',
  recipientCity: '',
  relationship: '',
  occasion: '',
  experienceId: '',
  loves: '',
  dislikes: '',
  message: '',
  instructions: '',
  date: '',
  time: '',
  address: '',
  phone: '',
}

function initialForm(searchParams) {
  const draft = loadDraft() ?? emptyForm
  const experienceId = searchParams.get('experience')
  if (experienceId && experiences.some((item) => item.id === experienceId)) {
    return { ...emptyForm, ...draft, experienceId }
  }
  return { ...emptyForm, ...draft }
}

export default function CreateSurprise() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => initialForm(searchParams))

  function updateForm(partial) {
    setForm((current) => ({ ...current, ...partial }))
  }

  function goTo(nextStep) {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToPayment() {
    saveDraft(form)
    navigate('/payment', { state: { form } })
  }

  return (
    <div className="min-h-svh bg-ivory">
      <header className="border-b border-sand/80 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-xl font-semibold text-charcoal sm:text-2xl">
            Surprise
          </Link>
          <p className="font-display text-base text-charcoal sm:text-lg">Create a Surprise</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-6 sm:py-8">
        <ProgressSteps current={step} />
      </div>

      <main className="mx-auto max-w-3xl px-5 pb-16">
        <div key={step} className="step-enter">
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
            <StepReview data={form} onEdit={goTo} onBack={() => goTo(5)} onContinue={goToPayment} />
          ) : null}
        </div>
      </main>
    </div>
  )
}
