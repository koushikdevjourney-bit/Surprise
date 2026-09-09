import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import AdminExperiences from './admin/pages/Experiences'
import AdminOrderDetails from './admin/pages/OrderDetails'
import AdminOrders from './admin/pages/Orders'
import AdminOverview from './admin/pages/Overview'
import AdminPartners from './admin/pages/Partners'
import AdminSettings from './admin/pages/Settings'
import AiPlanner from './pages/AiPlanner'
import BecomePartner from './pages/BecomePartner'
import Confirmation from './pages/Confirmation'
import CreateSurprise from './pages/CreateSurprise'
import Experiences from './pages/Experiences'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Nri from './pages/Nri'
import Payment from './pages/Payment'
import SurpriseTracking from './pages/SurpriseTracking'

function CreateRedirect() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  if (type) {
    sessionStorage.setItem('surprise.type', type)
  }
  const query = searchParams.toString()
  return <Navigate to={query ? `/create-surprise?${query}` : '/create-surprise'} replace />
}

function QueryRedirect({ to }) {
  const [searchParams] = useSearchParams()
  const query = searchParams.toString()
  return <Navigate to={query ? `${to}?${query}` : to} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/create-surprise" element={<CreateSurprise />} />
      <Route path="/create" element={<CreateRedirect />} />
      <Route path="/ai-planner" element={<AiPlanner />} />
      <Route path="/planner" element={<QueryRedirect to="/ai-planner" />} />
      <Route path="/explore" element={<QueryRedirect to="/experiences" />} />
      <Route path="/surprises" element={<QueryRedirect to="/experiences" />} />
      <Route path="/my-surprises" element={<Navigate to="/" replace />} />
      <Route path="/reactions" element={<Navigate to="/" replace />} />
      <Route path="/nri" element={<Nri />} />
      <Route path="/become-a-partner" element={<BecomePartner />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/surprise/:id" element={<SurpriseTracking />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<Navigate to="/admin" replace />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="experiences" element={<AdminExperiences />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
