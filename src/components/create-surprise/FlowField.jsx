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
  inputClassName = '',
}) {
  const classes =
    `mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog/60 focus:border-pink/50 focus:ring-2 focus:ring-pink/20 ${inputClassName}`

  return (
    <div>
      <label htmlFor={id} className="font-ui text-sm font-semibold text-snow">
        {label}
        {required ? (
          <span className="ml-1 font-medium text-pink" aria-hidden="true">
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
          className={`${classes} min-h-24 resize-y`}
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
