import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const links = [
  { to: '/experiences', label: 'Experiences' },
  { to: '/ai-planner', label: 'AI Planner' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/nri', label: 'For NRIs' },
  { to: '/become-a-partner', label: 'Partner with Us' },
]

function linkClass({ isActive }) {
  return `font-ui text-sm font-medium transition-colors hover:text-snow ${isActive ? 'text-snow' : 'text-fog'}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-snow">
          Surprise <span aria-hidden="true">🎯</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Button to="/create-surprise">Create Surprise</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-4 bg-snow transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-4 bg-snow transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-4 bg-snow transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-void px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `py-2 ${linkClass({ isActive })}`}
                onClick={close}
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/create-surprise" className="mt-1 w-full" onClick={close}>
              Create Surprise
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
