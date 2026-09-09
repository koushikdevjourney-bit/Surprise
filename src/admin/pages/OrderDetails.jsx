import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { experiences } from '../../data/experiences'
import { formatTime } from '../../lib/format'
import {
  NEXT_ACTION_LABELS,
  STATUS_FLOW,
  useAdminStore,
} from '../adminStore'
import StatusBadge from '../components/StatusBadge'
import { experienceTitle, formatOpsDate } from '../format'

const timelineSteps = [
  { id: 'confirmed', label: 'Booking confirmed' },
  { id: 'assigned', label: 'Partner assigned' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'on-the-way', label: 'On the way' },
  { id: 'completed', label: 'Surprise completed' },
]

function isStepDone(status, partnerId, stepId) {
  const index = STATUS_FLOW.indexOf(status)
  if (stepId === 'confirmed') return true
  if (stepId === 'assigned') return Boolean(partnerId) || index >= STATUS_FLOW.indexOf('assigned')
  if (stepId === 'preparing') return index >= STATUS_FLOW.indexOf('preparing')
  if (stepId === 'on-the-way') return index >= STATUS_FLOW.indexOf('on-the-way')
  if (stepId === 'completed') return status === 'completed'
  return false
}

export default function AdminOrderDetails() {
  const { id } = useParams()
  const { orders, partners, assignPartner, advanceStatus } = useAdminStore()
  const order = orders.find((item) => item.id === id)
  const [selectedPartnerId, setSelectedPartnerId] = useState('')

  const assignedPartner = partners.find((item) => item.id === order?.partnerId)
  const cityPartners = useMemo(() => {
    if (!order) return []
    const matches = partners.filter((item) => item.city === order.city)
    return matches.length ? matches : partners
  }, [order, partners])

  if (!order) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Order not found</h1>
        <p className="mt-2 text-sm text-slate-500">That booking isn&apos;t in the operations queue.</p>
        <Link to="/admin/orders" className="mt-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-800">
          Back to orders
        </Link>
      </div>
    )
  }

  const nextLabel = NEXT_ACTION_LABELS[order.status]
  const experience = experienceTitle(experiences, order.experienceId)

  function handleAssign() {
    if (!selectedPartnerId) return
    assignPartner(order.id, selectedPartnerId)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin/orders" className="text-sm font-medium text-blue-700 hover:text-blue-800">
        ← Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{order.id}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {order.recipientName} · {order.city} · {order.occasion} · {experience}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {formatOpsDate(order.date)} · {formatTime(order.time)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recipient</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Name" value={order.recipientName} />
            <Row label="Phone" value={order.phone} />
            <Row label="Address" value={order.address} />
          </dl>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Personal</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{order.personal}</p>
          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">Message</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">&ldquo;{order.message}&rdquo;</p>
        </section>
      </div>

      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Assign Surprise Partner</h2>
        {assignedPartner ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">✓ Partner assigned — {assignedPartner.name}</p>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Select a local partner for this city.</p>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <select
            value={selectedPartnerId}
            onChange={(event) => setSelectedPartnerId(event.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Choose partner</option>
            {cityPartners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.name} — {partner.type} — {partner.rating} — {partner.availability}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!selectedPartnerId}
            onClick={handleAssign}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Partner
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Status</h2>
        <ol className="mt-4 space-y-3">
          {timelineSteps.map((step) => {
            const done = isStepDone(order.status, order.partnerId, step.id)
            return (
              <li key={step.id} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {done ? '✓' : '○'}
                </span>
                <span className={done ? 'text-slate-900' : 'text-slate-500'}>{step.label}</span>
              </li>
            )
          })}
        </ol>

        {nextLabel ? (
          <button
            type="button"
            onClick={() => advanceStatus(order.id)}
            className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {nextLabel}
          </button>
        ) : (
          <p className="mt-5 text-sm font-medium text-emerald-700">Surprise completed.</p>
        )}
      </section>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  )
}
