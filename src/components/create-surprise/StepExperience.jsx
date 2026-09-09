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
      <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
        How do you want to surprise them?
      </h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
        Choose the experience — we&apos;ll take care of making it land.
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
              className={`rounded-2xl border p-6 text-left shadow-sm transition-all duration-200 ${
                selected
                  ? 'border-terracotta bg-terracotta/8 ring-2 ring-terracotta/25'
                  : 'border-sand bg-card hover:-translate-y-0.5 hover:border-terracotta/30 hover:shadow-md'
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-2xl">
                <span aria-hidden="true">{item.emoji}</span>
              </div>
              <p className="font-display text-xl font-medium text-charcoal">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <p className="mt-5 text-sm font-semibold text-terracotta">{item.price}</p>
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
