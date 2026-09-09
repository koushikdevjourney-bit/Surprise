export default function FlowField({
  id,
  label,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  list,
}) {
  const classes =
    'mt-2 w-full rounded-2xl border border-sand bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/15'

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 font-medium text-terracotta" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${classes} resize-y min-h-24`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          list={list}
          className={classes}
        />
      )}
    </div>
  )
}
