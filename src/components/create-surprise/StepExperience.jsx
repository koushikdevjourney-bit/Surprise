import { experiences } from '../../data/experiences'
import Button from '../Button'

export default function StepExperience({ data, onChange, onBack, onContinue }) {
  const valid = Boolean(data.experienceId)

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 03 · Experience</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Pick the experience</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        This is the move. The Surprise Crew will make it land.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {experiences.map((item) => {
          const selected = data.experienceId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ experienceId: item.id })}
              aria-pressed={selected}
              className={`rounded-2xl border p-6 text-left transition-all duration-200 mood-border-${item.mood} ${
                selected ? 'bg-pink/10 ring-2 ring-pink/30' : 'bg-panel hover:-translate-y-0.5'
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-raised text-2xl">
                <span aria-hidden="true">{item.emoji}</span>
              </div>
              <p className="font-display text-xl font-bold text-snow">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-fog">{item.description}</p>
              <p className="mt-5 text-sm font-semibold text-pink-hot">{item.price}</p>
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
