import { occasions } from '../../data/occasions'
import Button from '../Button'

export default function StepOccasion({ data, onChange, onBack, onContinue }) {
  const valid = Boolean(data.occasion)

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 02 · Moment</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">What&apos;s the occasion?</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        Pick the moment. We&apos;ll match the energy.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {occasions.map((item) => {
          const selected = data.occasion === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ occasion: item.id })}
              aria-pressed={selected}
              className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                selected
                  ? 'border-pink bg-pink/10 ring-2 ring-pink/30'
                  : 'border-line bg-panel hover:border-pink/40'
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {item.emoji}
              </span>
              <p className="mt-3 font-display text-xl text-snow">{item.label}</p>
            </button>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="submit" disabled={!valid} className="w-full px-7 py-3 sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}
