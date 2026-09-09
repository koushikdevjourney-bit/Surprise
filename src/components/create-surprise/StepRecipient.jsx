import { recipientCities } from '../../data/cities'
import { relationshipMeta, relationships } from '../../data/relationships'
import Button from '../Button'
import FlowField from './FlowField'

export default function StepRecipient({ data, onChange, onContinue }) {
  const valid = data.recipientName.trim() && data.recipientCity.trim() && data.relationship
  const extraCity =
    data.recipientCity && !recipientCities.includes(data.recipientCity) ? data.recipientCity : null

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-3xl" aria-hidden="true">
        🎯
      </p>
      <p className="mt-2 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">
        Step 01 · Target
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Who&apos;s the target?</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        Tell us who gets the magic. We&apos;ll handle the rest.
      </p>

      <div className="mt-8 space-y-5">
        <FlowField
          id="recipientName"
          label="Their name"
          required
          value={data.recipientName}
          onChange={(event) => onChange({ recipientName: event.target.value })}
          placeholder="e.g. Ananya"
          inputClassName="focus:border-l-4 focus:border-pink-500 focus:shadow-[inset_4px_0_12px_rgba(255,51,102,0.25)]"
        />

        <div>
          <label htmlFor="recipientCity" className="font-ui text-sm font-semibold text-snow">
            Their city
            <span className="ml-1 font-medium text-pink" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="recipientCity"
            name="recipientCity"
            required
            value={data.recipientCity}
            onChange={(event) => onChange({ recipientCity: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-line bg-[#16161f] px-4 py-3 text-sm text-snow outline-none transition-colors focus:border-[#FF3366] focus:ring-2 focus:ring-[#FF3366]/20"
          >
            <option value="">Select a city</option>
            {extraCity ? <option value={extraCity}>{extraCity}</option> : null}
            {recipientCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="font-ui text-sm font-semibold text-snow">
            Your relationship
            <span className="ml-1 font-medium text-pink" aria-hidden="true">
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
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    selected
                      ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-[0_0_18px_rgba(255,51,102,0.45)]'
                      : 'border-gray-600 bg-[#16161f] text-gray-400 hover:border-gray-400 hover:text-snow'
                  }`}
                >
                  {option} {relationshipMeta[option] ?? ''}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          type="submit"
          disabled={!valid}
          className={`w-full px-7 py-3 sm:w-auto ${valid ? 'animate-pulse' : ''}`}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
