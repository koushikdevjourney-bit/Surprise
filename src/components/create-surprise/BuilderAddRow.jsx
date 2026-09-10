import { formatInr } from '../../lib/format'

export default function BuilderAddRow({ item, added, onToggle }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#1a1a2e] px-4 py-3 transition-colors hover:bg-[#22223a]">
      <span className="text-2xl" aria-hidden="true">
        {item.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-ui text-sm font-semibold text-snow">{item.name}</p>
        <p className="text-xs leading-relaxed text-fog">{item.description}</p>
      </div>
      <p className="shrink-0 font-ui text-sm font-semibold text-snow">{formatInr(item.price)}</p>
      {added ? (
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-full bg-[#22c55e]/15 px-2.5 py-1 text-[11px] font-bold text-[#22c55e]">✓ Added</span>
          <button type="button" onClick={onToggle} className="text-[11px] text-gray-500 underline-offset-2 hover:text-fog hover:underline">
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-label={`Add ${item.name}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FF3366] font-ui text-lg leading-none text-[#FF3366] transition-colors hover:bg-[#FF3366] hover:text-white"
        >
          +
        </button>
      )}
    </div>
  )
}
