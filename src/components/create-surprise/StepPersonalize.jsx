import Button from '../Button'
import FlowField from './FlowField'

export default function StepPersonalize({ data, onChange, onBack, onContinue }) {
  function handleSubmit(event) {
    event.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 04 · Magic</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Personalize the magic.</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        Tiny details. Huge impact. Brief the crew like a hype friend.
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
          label="Notes for the Surprise Crew"
          value={data.instructions}
          onChange={(event) => onChange({ instructions: event.target.value })}
          placeholder="Anything else the crew should know?"
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
