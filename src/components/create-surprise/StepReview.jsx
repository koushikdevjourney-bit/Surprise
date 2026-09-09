import { experiences } from '../../data/experiences'
import { occasions } from '../../data/occasions'
import { formatDate, formatTime } from '../../lib/format'
import Button from '../Button'

function ReviewBlock({ title, onEdit, children }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-snow underline-offset-4 hover:text-pink-hot hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 text-base leading-relaxed text-snow">{children}</div>
    </section>
  )
}

export default function StepReview({ data, onEdit, onBack, onContinue }) {
  const occasion = occasions.find((item) => item.id === data.occasion)
  const experience = experiences.find((item) => item.id === data.experienceId)

  const personalBits = [
    data.loves && `Loves: ${data.loves}`,
    data.dislikes && `Doesn't like: ${data.dislikes}`,
    data.instructions && `Crew notes: ${data.instructions}`,
  ].filter(Boolean)

  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 06 · Review</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">The payload looks locked.</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-fog">
        Last look before the briefing. Jump back to any step — nothing gets lost.
      </p>

      <div className="mt-8 grid gap-4">
        <ReviewBlock title="Target" onEdit={() => onEdit(1)}>
          <p className="font-display text-xl">
            {data.recipientName}
            {data.relationship ? (
              <span className="ml-2 font-sans text-sm font-medium text-fog">· {data.relationship}</span>
            ) : null}
          </p>
          <p className="mt-1 text-fog">{data.recipientCity}</p>
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
          {experience ? <p className="mt-1 text-sm text-fog">{experience.description}</p> : null}
        </ReviewBlock>

        <ReviewBlock title="Date" onEdit={() => onEdit(5)}>
          {formatDate(data.date)}
        </ReviewBlock>

        <ReviewBlock title="Time" onEdit={() => onEdit(5)}>
          {formatTime(data.time)}
        </ReviewBlock>

        <ReviewBlock title="Personal details" onEdit={() => onEdit(4)}>
          {personalBits.length ? (
            <ul className="space-y-2 text-sm text-fog">
              {personalBits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-fog">No extra details added.</p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Message" onEdit={() => onEdit(4)}>
          {data.message.trim() ? (
            <p className="whitespace-pre-wrap">{data.message}</p>
          ) : (
            <p className="text-sm text-fog">No personal message yet.</p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Price" onEdit={() => onEdit(3)}>
          <p className="font-display text-2xl text-pink-hot">{experience?.startingPrice ?? '—'}</p>
          <p className="mt-1 text-sm text-fog">{experience?.price}</p>
        </ReviewBlock>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-raised px-5 py-6 text-center sm:px-8">
        <p className="font-display text-2xl text-snow">Ready for the briefing?</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button type="button" variant="ghost" onClick={onBack} className="px-2">
            Back
          </Button>
          <Button type="button" onClick={onContinue} className="w-full px-7 py-3 sm:w-auto">
            Open Mission Briefing
          </Button>
        </div>
      </div>
    </div>
  )
}
