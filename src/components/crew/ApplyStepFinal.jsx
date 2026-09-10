import { hearAboutOptions } from '../../data/crew'
import Button from '../Button'
import CrewField from './CrewField'

export default function ApplyStepFinal({ data, onChange, onBack, onSubmit }) {
  const valid = data.hearAbout && data.agreeVerify && data.agreeRepresent

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 03 · Final Step</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Almost done</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        One last check. Then you&apos;re in the queue.
      </p>

      <div className="mt-8 space-y-5">
        <CrewField
          id="hearAbout"
          label="How did you hear about us?"
          as="select"
          required
          value={data.hearAbout}
          onChange={(event) => onChange({ hearAbout: event.target.value })}
        >
          <option value="">Select one</option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </CrewField>

        <div>
          <CrewField
            id="standout"
            label="What makes you the right person for this?"
            as="textarea"
            optional
            rows={4}
            maxLength={200}
            value={data.standout}
            onChange={(event) => onChange({ standout: event.target.value.slice(0, 200) })}
            placeholder="Tell us something that makes you stand out"
          />
          <p className="mt-1 text-right text-xs text-fog">{data.standout.length}/200</p>
        </div>

        <fieldset className="space-y-3">
          <legend className="sr-only">Agreements</legend>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-[#1a1a2e] p-4 text-sm text-snow">
            <input
              type="checkbox"
              checked={data.agreeVerify}
              onChange={(event) => onChange({ agreeVerify: event.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[#FF3366]"
              required
            />
            <span>
              I agree to undergo identity verification before my first order
              <span className="ml-1 text-[#FF3366]" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-[#1a1a2e] p-4 text-sm text-snow">
            <input
              type="checkbox"
              checked={data.agreeRepresent}
              onChange={(event) => onChange({ agreeRepresent: event.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[#FF3366]"
              required
            />
            <span>
              I understand I represent Surprise India during every mission
              <span className="ml-1 text-[#FF3366]" aria-hidden="true">
                *
              </span>
            </span>
          </label>
        </fieldset>
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="submit" disabled={!valid} className="w-full bg-[#FF3366] px-7 py-3 hover:bg-[#ff4d7a] sm:w-auto">
          Submit Application
        </Button>
      </div>
    </form>
  )
}
