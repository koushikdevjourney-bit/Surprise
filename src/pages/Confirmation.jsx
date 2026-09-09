import { useLocation } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Layout from '../components/Layout'
import StepAccepted from '../components/create-surprise/StepAccepted'
import { isBookingComplete, resolveBooking } from '../lib/booking'

export default function Confirmation() {
  const location = useLocation()
  const booking = resolveBooking(location.state)

  if (!isBookingComplete(booking) || !booking.id) {
    return (
      <Layout>
        <EmptyState
          title="No mission to show"
          body="Once you launch, your Mission ID lands here."
          primaryTo="/create-surprise"
          primaryLabel="Create Surprise"
          secondaryTo="/"
          secondaryLabel="Back to Home"
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <StepAccepted booking={booking} />
      </main>
    </Layout>
  )
}
