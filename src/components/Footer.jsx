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
    'group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors duration-200 hover:text-[#FF3366]'
  const arrow = (
    <span
      aria-hidden="true"
      className="translate-x-[-2px] text-[11px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
    >
      →
    </span>
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
        {arrow}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {children}
      {arrow}
    </a>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.28-.14-1.64-.81-1.89-.9-.25-.1-.44-.14-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.91-.16-.28-.02-.42.12-.56.13-.13.28-.33.42-.5.14-.16.18-.28.28-.47.09-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.47.07-.72.35-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.14.18 1.91 2.91 4.63 4.08.65.28 1.15.45 1.54.57.65.21 1.24.18 1.71.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
      <path d="M12.04 2.16c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.32 4.94L2 22l5.14-1.35a9.86 9.86 0 0 0 4.9 1.25h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7-1.87-1.87-4.36-2.84-7.01-2.84Zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.05.8.81-2.97-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.53 3.69-8.21 8.22-8.21 2.19 0 4.26.86 5.81 2.41a8.17 8.17 0 0 1 2.4 5.81c0 4.53-3.69 8.17-8.24 8.17Z" />
    </svg>
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
        borderTopColor: 'rgba(255,51,102,0.3)',
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-sm">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-snow">
            Surprise <span aria-hidden="true">🎯</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            You don&apos;t have to be there.
            <br />
            We&apos;ll make them feel you were.
          </p>

          <div className="mt-6 flex gap-2.5">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#16161f] text-zinc-400 transition-colors hover:text-[#FF3366]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#16161f] text-zinc-400 transition-colors hover:text-[#FF3366]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#16161f] text-zinc-400 transition-colors hover:text-[#FF3366]"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-sm text-[#FF3366]/55">Made with ❤️ in India 🇮🇳</p>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {explore.map((item) => (
              <li key={item.to}>
                <FooterLink to={item.to}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Cities</p>
          <ul className="mt-4 space-y-2.5">
            {cities.map((city) => (
              <li key={city}>
                <FooterLink to={`/experiences?city=${encodeURIComponent(city)}`}>{city}</FooterLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-zinc-600">+ 6 more cities coming soon</p>
        </div>

        <div>
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Company</p>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 py-5 text-center text-[11px] text-zinc-600">
          <span>© 2025 Surprise India</span>
          <span aria-hidden="true">|</span>
          <span>🔒 Safe &amp; Verified Crews</span>
          <span aria-hidden="true">|</span>
          <span>📱 WhatsApp Support</span>
        </div>
      </div>
    </footer>
  )
}
