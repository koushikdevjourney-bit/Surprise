import { cities } from '../../data/cities'
import { relationships } from '../../data/relationships'
import Button from '../Button'
import FlowField from './FlowField'

export default function StepRecipient({ data, onChange, onContinue }) {
  const valid =
    data.recipientName.trim() && data.recipientCity.trim() && data.relationship

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
        Who are you surprising?
      </h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
        Tell us a little about the person you&apos;re making this moment for.
      </p>

      <div className="mt-8 space-y-5">
        <FlowField
          id="recipientName"
          label="Their name"
          required
          value={data.recipientName}
          onChange={(event) => onChange({ recipientName: event.target.value })}
          placeholder="e.g. Ananya"
        />
        <FlowField
          id="recipientCity"
          label="Their city"
          required
          value={data.recipientCity}
          onChange={(event) => onChange({ recipientCity: event.target.value })}
          placeholder="e.g. Mumbai"
          list="city-options"
        />
        <datalist id="city-options">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <fieldset>
          <legend className="text-sm font-semibold text-charcoal">
            Your relationship
            <span className="ml-1 font-medium text-terracotta" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {relationships.map((option) => {
              const selected = data.relationship === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange({ relationship: option })}
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-sand bg-white text-charcoal hover:border-terracotta/40'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-10 flex justify-end">
        <Button type="submit" disabled={!valid} className="w-full px-7 py-3 sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}
