import { getBuilderLines, getBuilderSubtotal, hasBuiltSurprise } from '../../lib/builder'
import { formatInr } from '../../lib/format'
import Button from '../Button'

export default function BuilderOrderSummary({ data, onRemove, onContinue, variant = 'panel' }) {
  const lines = getBuilderLines(data)
  const total = getBuilderSubtotal(data)
  const valid = hasBuiltSurprise(data)
  const countable = lines.filter((line) => !(line.included && line.section === 'transport'))

  if (variant === 'bar') {
    return (
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-fog">
            {countable.length} {countable.length === 1 ? 'item' : 'items'}
          </p>
          <p className="font-display text-xl font-bold text-[#FF3366]">{formatInr(total)}</p>
        </div>
        <Button type="button" disabled={!valid} onClick={onContinue} className="bg-[#FF3366] px-6 py-3 hover:bg-[#ff4d7a]">
          Continue
        </Button>
      </div>
    )
  }

  return (
    <aside className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] p-5">
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Your Surprise</p>
      <h3 className="mt-1 font-display text-xl font-bold text-snow">Live order</h3>

      {lines.length === 0 ? (
        <p className="mt-5 text-sm leading-relaxed text-fog">Start building. Pick a crew to begin.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {lines.map((line) => (
            <li key={`${line.section}-${line.id}`} className="flex items-start justify-between gap-3 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-snow">
                  <span aria-hidden="true">{line.emoji} </span>
                  {line.name}
                </p>
                {line.removable ? (
                  <button
                    type="button"
                    onClick={() => onRemove(line)}
                    className="mt-0.5 text-[11px] text-gray-500 underline-offset-2 hover:text-fog hover:underline"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <p className="shrink-0 font-semibold text-snow">
                {line.included ? <span className="text-[#22c55e]">Included</span> : formatInr(line.price)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-ui text-sm font-semibold text-fog">Total</span>
        <span className="font-display text-2xl font-bold text-[#FF3366]">{formatInr(total)}</span>
      </div>

      <Button
        type="button"
        disabled={!valid}
        onClick={onContinue}
        className="mt-5 w-full bg-[#FF3366] py-3 hover:bg-[#ff4d7a]"
      >
        Continue
      </Button>
      {!valid ? <p className="mt-2 text-center text-xs text-fog">Pick a crew to continue.</p> : null}
    </aside>
  )
}
