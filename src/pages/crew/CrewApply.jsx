import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ApplyStepAbout from '../../components/crew/ApplyStepAbout'
import ApplyStepFinal from '../../components/crew/ApplyStepFinal'
import ApplyStepWork from '../../components/crew/ApplyStepWork'
import ApplySuccess from '../../components/crew/ApplySuccess'
import CrewProgress from '../../components/crew/CrewProgress'
import { emptyCrewApplication } from '../../data/crew'

const STEP_FLASHES = {
  1: 'Looking good. 🎯',
  2: 'Almost there. One more step. ✨',
}

function generateApplicationId() {
  return `APP-${String(Math.floor(1000 + Math.random() * 9000))}`
}

export default function CrewApply() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(emptyCrewApplication)
  const [applicationId, setApplicationId] = useState(null)
  const [flash, setFlash] = useState(null)
  const pendingStep = useRef(null)
  const flashTimer = useRef(null)

  function updateForm(partial) {
    setForm((current) => ({ ...current, ...partial }))
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

  function handleSubmit() {
    setApplicationId(generateApplicationId())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-svh bg-[#0d0d0d] pb-24 text-snow">
      <header className="border-b border-line/80 bg-[#0d0d0d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/crew" className="font-display text-xl font-extrabold text-snow sm:text-2xl">
            Surprise <span aria-hidden="true">🎯</span>
          </Link>
          <p className="font-ui text-sm font-semibold text-fog sm:text-base">Crew Application</p>
        </div>
      </header>

      {!applicationId ? (
        <div className="mx-auto max-w-3xl px-5 py-6 sm:py-8">
          <CrewProgress current={step} />
        </div>
      ) : null}

      <main className="mx-auto max-w-3xl px-5 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <AnimatePresence mode="wait">
            {applicationId ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              >
                <ApplySuccess applicationId={applicationId} />
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.25 } }}
              >
                {step === 1 ? (
                  <ApplyStepAbout data={form} onChange={updateForm} onContinue={() => advanceTo(2)} />
                ) : null}
                {step === 2 ? (
                  <ApplyStepWork
                    data={form}
                    onChange={updateForm}
                    onBack={() => goTo(1)}
                    onContinue={() => advanceTo(3)}
                  />
                ) : null}
                {step === 3 ? (
                  <ApplyStepFinal data={form} onChange={updateForm} onBack={() => goTo(2)} onSubmit={handleSubmit} />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

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
            <p className="text-center font-display text-3xl font-bold text-white">{flash}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
