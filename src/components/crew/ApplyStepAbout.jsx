import { crewCities, crewTypes } from '../../data/crew'
import Button from '../Button'
import CrewField, { PillButton } from './CrewField'

export default function ApplyStepAbout({ data, onChange, onContinue }) {
  const valid = data.fullName.trim() && data.phone.replace(/\D/g, '').length >= 10 && data.city && data.skills.length > 0

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  function toggleSkill(id) {
    const next = data.skills.includes(id) ? data.skills.filter((item) => item !== id) : [...data.skills, id]
    onChange({ skills: next })
  }

  function handlePhone(event) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 10)
    onChange({ phone: digits })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 01 · About You</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Tell us about yourself</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        A few basics so we know who you are and where you show up.
      </p>

      <div className="mt-8 space-y-5">
        <CrewField
          id="fullName"
          label="Full Name"
          required
          value={data.fullName}
          onChange={(event) => onChange({ fullName: event.target.value })}
          placeholder="e.g. Arjun Kumar"
        />

        <div>
          <label htmlFor="phone" className="font-ui text-sm font-semibold text-snow">
            Phone Number
            <span className="ml-1 font-medium text-[#FF3366]" aria-hidden="true">
              *
            </span>
          </label>
          <div className="mt-2 flex">
            <span className="inline-flex items-center rounded-l-2xl border border-r-0 border-line bg-[#16161f] px-3 font-ui text-sm font-semibold text-fog">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={data.phone}
              onChange={handlePhone}
              placeholder="98765 43210"
              required
              className="w-full rounded-r-2xl border border-line bg-raised px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog/60 focus:border-[#FF3366] focus:ring-2 focus:ring-[#FF3366]/20"
            />
          </div>
        </div>

        <CrewField
          id="city"
          label="City"
          as="select"
          required
          value={data.city}
          onChange={(event) => onChange({ city: event.target.value })}
        >
          <option value="">Select a city</option>
          {crewCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </CrewField>

        <fieldset>
          <legend className="font-ui text-sm font-semibold text-snow">
            Your Skill/Role
            <span className="ml-1 font-medium text-[#FF3366]" aria-hidden="true">
              *
            </span>
          </legend>
          <p className="mt-1 text-xs text-fog">Select all that apply.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {crewTypes.map((type) => (
              <PillButton key={type.id} selected={data.skills.includes(type.id)} onClick={() => toggleSkill(type.id)}>
                <span aria-hidden="true">{type.emoji}</span> {type.role}
              </PillButton>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-10 flex justify-end">
        <Button type="submit" disabled={!valid} className="w-full bg-[#FF3366] px-7 py-3 hover:bg-[#ff4d7a] sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}
