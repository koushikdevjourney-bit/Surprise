import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How it Works' },
  { to: '/experiences', label: 'Experiences' },
]

function linkClass({ isActive }) {
  return `hover:text-charcoal ${isActive ? 'text-charcoal' : 'text-muted'}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-charcoal">
          Surprise
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button to="/create-surprise">Create a Surprise</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-4 bg-charcoal transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-4 bg-charcoal transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-4 bg-charcoal transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-sand bg-ivory px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `py-2 ${linkClass({ isActive })}`}
                onClick={close}
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/create-surprise" className="mt-1 w-full" onClick={close}>
              Create a Surprise
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
