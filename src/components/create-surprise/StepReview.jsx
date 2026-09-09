import { experiences } from '../../data/experiences'
import { occasions } from '../../data/occasions'
import { formatDate, formatTime } from '../../lib/format'
import Button from '../Button'

function ReviewBlock({ title, onEdit, children }) {
  return (
    <section className="rounded-2xl border border-sand bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-terracotta">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-charcoal underline-offset-4 hover:text-terracotta hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 text-base leading-relaxed text-charcoal">{children}</div>
    </section>
  )
}

export default function StepReview({ data, onEdit, onBack, onContinue }) {
  const occasion = occasions.find((item) => item.id === data.occasion)
  const experience = experiences.find((item) => item.id === data.experienceId)

  const personalBits = [
    data.loves && `Loves: ${data.loves}`,
    data.dislikes && `Doesn't like: ${data.dislikes}`,
    data.instructions && `Instructions: ${data.instructions}`,
  ].filter(Boolean)

  return (
    <div>
      <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
        Your surprise is ready.
      </h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
        Take a last look. You can still tweak anything before payment.
      </p>

      <div className="mt-8 grid gap-4">
        <ReviewBlock title="Recipient" onEdit={() => onEdit(1)}>
          <p className="font-display text-xl">
            {data.recipientName}
            {data.relationship ? (
              <span className="ml-2 text-sm font-sans font-medium text-muted">
                · {data.relationship}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-muted">{data.recipientCity}</p>
        </ReviewBlock>

        <ReviewBlock title="Occasion" onEdit={() => onEdit(2)}>
          <p>
            {occasion ? (
              <>
                <span aria-hidden="true">{occasion.emoji} </span>
                {occasion.label}
              </>
            ) : (
              '—'
            )}
          </p>
        </ReviewBlock>

        <ReviewBlock title="Experience" onEdit={() => onEdit(3)}>
          <p className="font-display text-xl">{experience?.title ?? '—'}</p>
          {experience ? <p className="mt-1 text-sm text-muted">{experience.description}</p> : null}
        </ReviewBlock>

        <ReviewBlock title="Date" onEdit={() => onEdit(5)}>
          {formatDate(data.date)}
        </ReviewBlock>

        <ReviewBlock title="Time" onEdit={() => onEdit(5)}>
          {formatTime(data.time)}
        </ReviewBlock>

        <ReviewBlock title="Personal details" onEdit={() => onEdit(4)}>
          {personalBits.length ? (
            <ul className="space-y-2 text-sm text-muted">
              {personalBits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No extra details added.</p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Message" onEdit={() => onEdit(4)}>
          {data.message.trim() ? (
            <p className="whitespace-pre-wrap">{data.message}</p>
          ) : (
            <p className="text-sm text-muted">No personal message yet.</p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Price" onEdit={() => onEdit(3)}>
          <p className="font-display text-2xl text-terracotta">
            {experience?.startingPrice ?? '—'}
          </p>
          <p className="mt-1 text-sm text-muted">{experience?.price}</p>
        </ReviewBlock>
      </div>

      <div className="mt-10 rounded-2xl border border-sand bg-cream px-5 py-6 text-center sm:px-8">
        <p className="font-display text-2xl text-charcoal">Everything look good?</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button type="button" variant="ghost" onClick={onBack} className="px-2">
            Back
          </Button>
          <Button type="button" onClick={onContinue} className="w-full px-7 py-3 sm:w-auto">
            Continue to Payment
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted">
          Payment is next — this step only reviews what you&apos;ve planned.
        </p>
      </div>
    </div>
  )
}
