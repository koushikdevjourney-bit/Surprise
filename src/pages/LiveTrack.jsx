import { useEffect, useState } from 'react'
import { Cake, CheckCircle2, MapPinned, Sparkles, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import { liveMilestones } from '../data/planWizard'
import { getTrack, saveTrack } from '../lib/plan'

const icons = {
  truck: Truck,
  map: MapPinned,
  check: CheckCircle2,
  cake: Cake,
  sparkles: Sparkles,
}

function milestoneIcon(name) {
  return icons[name] ?? Sparkles
}

export default function LiveTrack() {
  const { bookingId } = useParams()
  const [step, setStep] = useState(() => getTrack(bookingId).step)

  useEffect(() => {
    saveTrack(bookingId, step)
  }, [bookingId, step])

  useEffect(() => {
    if (step >= liveMilestones.length) return undefined
    const timer = window.setTimeout(() => setStep((current) => Math.min(liveMilestones.length, current + 1)), 5000)
    return () => window.clearTimeout(timer)
  }, [step])

  return (
    <div className="min-h-svh bg-ink px-5 py-12 text-snow">
      <SeoHead title="Day-of tracker — Surprise" description="Live execution milestones for your surprise." path={`/track/${bookingId}`} />
      <div className="mx-auto max-w-lg">
        <p className="font-ui text-xs uppercase tracking-[0.16em] text-pink-hot">Day-of live execution</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Mission {bookingId}</h1>
        <p className="mt-2 text-sm text-fog">Uber-style milestones. This is a prototype — no real GPS.</p>

        <ol className="relative mt-10 space-y-0">
          {liveMilestones.map((item, index) => {
            const state = index + 1 < step ? 'done' : index + 1 === step ? 'active' : 'wait'
            const Icon = milestoneIcon(item.icon)
            return (
              <li key={item.id} className="relative flex gap-4 pb-8">
                {index < liveMilestones.length - 1 ? (
                  <span
                    className={`absolute top-8 left-[15px] h-[calc(100%-16px)] w-0.5 ${state === 'wait' ? 'bg-white/10' : 'bg-[#FF3366]'}`}
                  />
                ) : null}
                <span
                  className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    state === 'done'
                      ? 'bg-[#22c55e] text-white'
                      : state === 'active'
                        ? 'bg-[#FF3366] text-white shadow-[0_0_18px_rgba(255,51,102,0.55)]'
                        : 'border border-white/15 bg-panel text-fog'
                  }`}
                >
                  {state === 'done' ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <div>
                  <p className={`font-display text-lg font-bold ${state === 'wait' ? 'text-fog' : 'text-snow'}`}>
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-fog">{item.detail}</p>
                  {state === 'active' ? (
                    <p className="mt-2 text-xs font-semibold text-pink-hot">In progress now</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-full border border-line px-4 py-2 text-sm text-fog"
          >
            Restart demo
          </button>
          <Link to="/plan" className="rounded-full bg-pink px-4 py-2 text-sm font-semibold text-white">
            Build another plan
          </Link>
        </div>
      </div>
    </div>
  )
}
