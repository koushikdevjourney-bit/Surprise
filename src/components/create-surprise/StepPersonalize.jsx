import Button from '../Button'
import FlowField from './FlowField'

export default function StepPersonalize({ data, onChange, onBack, onContinue }) {
  function handleSubmit(event) {
    event.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
        Make it personal.
      </h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
        The little details make the biggest difference.
      </p>

      <div className="mt-8 space-y-5">
        <FlowField
          id="loves"
          as="textarea"
          label="What do they love?"
          value={data.loves}
          onChange={(event) => onChange({ loves: event.target.value })}
          placeholder="e.g. They love cricket, biryani and old Telugu songs..."
        />
        <FlowField
          id="dislikes"
          as="textarea"
          label="Anything they don't like?"
          value={data.dislikes}
          onChange={(event) => onChange({ dislikes: event.target.value })}
          placeholder="e.g. They don't like loud surprises..."
        />
        <FlowField
          id="message"
          as="textarea"
          label="Your personal message"
          value={data.message}
          onChange={(event) => onChange({ message: event.target.value })}
          placeholder="Write something you'd like us to include..."
        />
        <FlowField
          id="instructions"
          as="textarea"
          label="Special instructions"
          value={data.instructions}
          onChange={(event) => onChange({ instructions: event.target.value })}
          placeholder="Anything else we should know?"
        />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="submit" className="w-full px-7 py-3 sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}
