import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const styles = {
    primary: 'bg-pink text-white hover:bg-pink-hot shadow-[0_0_24px_rgba(255,45,138,0.28)]',
    secondary: 'bg-raised text-snow border border-line hover:border-pink/50 hover:bg-panel',
    ghost: 'text-fog hover:text-snow',
  }

  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold font-ui transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${styles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
