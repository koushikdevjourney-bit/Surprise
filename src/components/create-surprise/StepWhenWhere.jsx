import Button from '../Button'
import FlowField from './FlowField'

export default function StepWhenWhere({ data, onChange, onBack, onContinue }) {
  const valid =
    data.date && data.time && data.address.trim() && data.phone.trim()

  function handleSubmit(event) {
    event.preventDefault()
    if (valid) onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
        When should the surprise happen?
      </h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
        Share a time and place so our local team can coordinate.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <FlowField
          id="date"
          type="date"
          label="Date"
          required
          value={data.date}
          onChange={(event) => onChange({ date: event.target.value })}
        />
        <FlowField
          id="time"
          type="time"
          label="Time"
          required
          value={data.time}
          onChange={(event) => onChange({ time: event.target.value })}
        />
        <div className="sm:col-span-2">
          <FlowField
            id="address"
            as="textarea"
            rows={3}
            label="Recipient's address"
            required
            value={data.address}
            onChange={(event) => onChange({ address: event.target.value })}
            placeholder="Street, area, city, pin code"
          />
        </div>
        <div className="sm:col-span-2">
          <FlowField
            id="phone"
            type="tel"
            label="Recipient's phone number"
            required
            value={data.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            placeholder="e.g. 98765 43210"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        We only use these details to coordinate your surprise.
      </p>

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
