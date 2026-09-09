import { useLocation, useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Layout from '../components/Layout'
import StepPayment from '../components/create-surprise/StepPayment'
import { generateBookingId, isBookingComplete, resolveForm, saveBooking, saveDraft } from '../lib/booking'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const form = resolveForm(location.state)

  if (!isBookingComplete(form)) {
    return (
      <Layout>
        <EmptyState
          title="Nothing to launch yet"
          body="Start a surprise first — we’ll bring you back here once the briefing is locked."
          primaryTo="/create-surprise"
          primaryLabel="Create Surprise"
          secondaryTo="/"
          secondaryLabel="Back to Home"
        />
      </Layout>
    )
  }

  function handlePaid() {
    const booking = { ...form, id: generateBookingId() }
    saveDraft(form)
    saveBooking(booking)
    navigate('/confirmation', { state: { booking } })
  }

  return (
    <Layout>
      <main className="mx-auto max-w-lg px-5 py-12 sm:py-16">
        <StepPayment data={form} onBack={() => navigate('/create-surprise')} onPaid={handlePaid} />
      </main>
    </Layout>
  )
}
