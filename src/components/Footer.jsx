import { Camera, Lock, MessageCircle, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'

const explore = [
  { to: '/experiences', label: 'Experiences' },
  { to: '/ai-planner', label: 'AI Planner' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/nri', label: 'For NRIs' },
  { to: '/become-a-partner', label: 'Partner with Us' },
  { to: '/create-surprise', label: 'Create Surprise' },
]

const cities = ['Hyderabad', 'Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Chennai']

const company = [
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'Terms' },
  { href: '#', label: 'Careers' },
  { href: '#', label: 'Press' },
]

function FooterLink({ to, href, children }) {
  const className =
    'group text-sm text-zinc-400 transition-colors duration-200 hover:text-white'

  const label = (
    <>
      <span aria-hidden="true" className="hidden group-hover:inline">
        →{' '}
      </span>
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  )
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.7 10.3 21.2 3h-1.54l-5.64 6.36L9.5 3H3.2l6.82 9.64L3.2 21h1.54l5.96-6.73L14.5 21h6.3l-6.1-10.7Zm-2.11 2.38-.69-.96-5.5-7.64h2.37l4.43 6.16.69.96 5.76 8.01h-2.37l-4.69-6.53Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="border-t pb-24 md:pb-0"
      style={{
        background: 'linear-gradient(180deg, #0D0D1A 0%, #000000 100%)',
        borderTop: '1px solid rgba(255,51,102,0.25)',
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[35%_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-sm">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            Surprise <span aria-hidden="true">🎯</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            You don&apos;t have to be there.
            <br />
            We&apos;ll make them feel you were.
          </p>

          <div className="mt-6 flex gap-2.5">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-[#FF3366]/50 hover:text-[#FF3366]"
            >
              <Camera className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-[#FF3366]/50 hover:text-[#FF3366]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-[#FF3366]/50 hover:text-[#FF3366]"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-xs text-pink-400/70">Made with ❤️ in India 🇮🇳</p>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {explore.map((item) => (
              <li key={item.to}>
                <FooterLink to={item.to}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Cities</p>
          <ul className="mt-4 space-y-2.5">
            {cities.map((city) => (
              <li key={city}>
                <FooterLink to={`/experiences?city=${encodeURIComponent(city)}`}>{city}</FooterLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-zinc-600">+ 6 more cities soon</p>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Company</p>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8">
        <div className="mt-12 h-px bg-white/5" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs text-gray-600">© 2025 Surprise India. All rights reserved.</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-500">
              <Lock className="h-3 w-3" aria-hidden="true" />
              🔒 Verified Crews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-500">
              <Smartphone className="h-3 w-3" aria-hidden="true" />
              📱 WhatsApp Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
