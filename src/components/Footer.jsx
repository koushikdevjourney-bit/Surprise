import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold text-snow">
            Surprise <span aria-hidden="true">💫</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fog">
            You don&apos;t have to be there to launch the moment. Real experiences, delivered by Surprise
            Crews across India.
          </p>
        </div>

        <div>
          <p className="font-ui text-sm font-semibold text-snow">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-fog">
            <li>
              <Link to="/experiences" className="hover:text-snow">
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/ai-planner" className="hover:text-snow">
                AI Planner
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-snow">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/nri" className="hover:text-snow">
                For NRIs
              </Link>
            </li>
            <li>
              <Link to="/become-a-partner" className="hover:text-snow">
                Partner with Us
              </Link>
            </li>
            <li>
              <Link to="/create-surprise" className="hover:text-snow">
                Create Surprise
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-ui text-sm font-semibold text-snow">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-fog">
            <li>
              <a href="#" className="hover:text-snow">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-snow">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-snow">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/80">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-fog">© {new Date().getFullYear()} Surprise</p>
      </div>
    </footer>
  )
}
