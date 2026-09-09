export default function Timeline({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              item.done ? 'bg-pink text-white' : 'border border-line bg-raised text-fog'
            }`}
            aria-hidden="true"
          >
            {item.done ? '✓' : '○'}
          </span>
          <p className={item.done ? 'text-snow' : 'text-fog'}>{item.label}</p>
        </li>
      ))}
    </ol>
  )
}
