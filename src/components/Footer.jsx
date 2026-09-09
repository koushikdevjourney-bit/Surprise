import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-charcoal">Surprise</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            You don&apos;t have to be there to make them feel special. Thoughtful surprises, delivered by local teams
            across India.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-charcoal">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-charcoal">
                Home
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-charcoal">
                How it Works
              </Link>
            </li>
            <li>
              <Link to="/experiences" className="hover:text-charcoal">
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/create-surprise" className="hover:text-charcoal">
                Create a Surprise
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-charcoal">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="#" className="hover:text-charcoal">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-charcoal">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-charcoal">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand/80">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted">© {new Date().getFullYear()} Surprise</p>
      </div>
    </footer>
  )
}
