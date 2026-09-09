import CityBanner from './CityBanner'
import FloatingCta from './FloatingCta'
import Footer from './Footer'
import Navbar from './Navbar'
import SocialToasts from './SocialToasts'

export default function Layout({ children, showFooter = true }) {
  return (
    <div className="min-h-svh bg-ink text-snow">
      <Navbar />
      <CityBanner />
      {children}
      {showFooter ? <Footer /> : null}
      <SocialToasts />
      <FloatingCta />
    </div>
  )
}
