import { availabilityOptions, experienceLevels } from '../../data/crew'
import Button from '../Button'
import CrewField, { PillButton } from './CrewField'

export default function ApplyStepWork({ data, onChange, onBack, onContinue }) {
  const valid = data.bio.trim().length > 0 && data.experience && data.availability.length > 0

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  function toggleAvailability(option) {
    const next = data.availability.includes(option)
      ? data.availability.filter((item) => item !== option)
      : [...data.availability, option]
    onChange({ availability: next })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 02 · Your Work</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Show us your work</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        Links help. Energy matters more. Tell us how you show up.
      </p>

      <div className="mt-8 space-y-5">
        <CrewField
          id="instagram"
          label="Instagram handle"
          optional
          value={data.instagram}
          onChange={(event) => onChange({ instagram: event.target.value })}
          placeholder="@yourhandle"
        />

        <CrewField
          id="portfolio"
          label="Portfolio link"
          optional
          value={data.portfolio}
          onChange={(event) => onChange({ portfolio: event.target.value })}
          placeholder="YouTube, website, etc."
        />

        <div>
          <CrewField
            id="bio"
            label="Describe yourself in one line"
            as="textarea"
            required
            rows={3}
            maxLength={100}
            value={data.bio}
            onChange={(event) => onChange({ bio: event.target.value.slice(0, 100) })}
            placeholder="e.g. Singer with 5 years experience, love making people smile"
          />
          <p className="mt-1 text-right text-xs text-fog">{data.bio.length}/100</p>
        </div>

        <fieldset>
          <legend className="font-ui text-sm font-semibold text-snow">
            Experience level
            <span className="ml-1 font-medium text-[#FF3366]" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {experienceLevels.map((level) => (
              <PillButton
                key={level.id}
                selected={data.experience === level.id}
                onClick={() => onChange({ experience: level.id })}
              >
                {level.emoji} {level.label}
              </PillButton>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-ui text-sm font-semibold text-snow">
            Availability
            <span className="ml-1 font-medium text-[#FF3366]" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {availabilityOptions.map((option) => (
              <PillButton
                key={option}
                selected={data.availability.includes(option)}
                onClick={() => toggleAvailability(option)}
              >
                {option}
              </PillButton>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="submit" disabled={!valid} className="w-full bg-[#FF3366] px-7 py-3 hover:bg-[#ff4d7a] sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}
