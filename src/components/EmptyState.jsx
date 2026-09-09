import { Link } from 'react-router-dom'
import Button from './Button'

export default function EmptyState({ title, body, primaryTo, primaryLabel, secondaryTo, secondaryLabel }) {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-lg flex-col justify-center px-5 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-snow">{title}</h1>
      <p className="mt-3 text-base leading-relaxed text-fog">{body}</p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {primaryTo ? (
          <Button to={primaryTo} className="w-full px-6 py-3 sm:w-auto">
            {primaryLabel}
          </Button>
        ) : null}
        {secondaryTo ? (
          <Link to={secondaryTo} className="text-sm font-semibold text-pink-hot hover:text-pink">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </main>
  )
}
