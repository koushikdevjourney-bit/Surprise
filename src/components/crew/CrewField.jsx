const inputClasses =
  'mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog/60 focus:border-[#FF3366] focus:ring-2 focus:ring-[#FF3366]/20'

export default function CrewField({
  id,
  label,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  optional = false,
  rows = 3,
  maxLength,
  hint,
  children,
}) {
  return (
    <div>
      <label htmlFor={id} className="font-ui text-sm font-semibold text-snow">
        {label}
        {required ? (
          <span className="ml-1 font-medium text-[#FF3366]" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? <span className="ml-2 font-medium text-fog">(optional)</span> : null}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${inputClasses} min-h-24 resize-y`}
        />
      ) : as === 'select' ? (
        <select id={id} name={id} required={required} value={value} onChange={onChange} className={`${inputClasses} bg-[#16161f]`}>
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={inputClasses}
        />
      )}
      {hint ? <p className="mt-1.5 text-xs text-fog">{hint}</p> : null}
    </div>
  )
}

export function PillButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        selected
          ? 'border-[#FF3366] bg-[#FF3366] text-white shadow-[0_0_18px_rgba(255,51,102,0.45)]'
          : 'border-gray-600 bg-[#16161f] text-gray-400 hover:border-gray-400 hover:text-snow'
      }`}
    >
      {children}
    </button>
  )
}
