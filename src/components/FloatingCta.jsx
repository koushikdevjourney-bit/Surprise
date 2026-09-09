import { Link, useLocation } from 'react-router-dom'

export default function FloatingCta() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <Link
        to="/create-surprise"
        className="pointer-events-auto mx-auto flex max-w-sm items-center justify-center rounded-full bg-pink px-5 py-3 font-ui text-sm font-semibold text-white shadow-[0_10px_40px_rgba(255,45,138,0.45)]"
      >
        🎉 Create Surprise
      </Link>
    </div>
  )
}
