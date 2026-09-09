import { Link } from 'react-router-dom'
import { experiences } from '../../data/experiences'
import { formatTime } from '../../lib/format'
import { experienceTitle } from '../format'
import StatusBadge from './StatusBadge'

export function OrderCard({ order }) {
  return (
    <Link
      to={`/admin/orders/${order.id}`}
      className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{order.id}</p>
          <p className="mt-1 text-sm text-slate-700">{order.recipientName}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
        <div>
          <dt>City</dt>
          <dd className="font-medium text-slate-800">{order.city}</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd className="font-medium text-slate-800">{experienceTitle(experiences, order.experienceId)}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd className="font-medium text-slate-800">{order.scheduleLabel}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd className="font-medium text-slate-800">{formatTime(order.time)}</dd>
        </div>
      </dl>
    </Link>
  )
}

export function OrdersTable({ orders, compact = false }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                <td className="px-4 py-3">{order.recipientName}</td>
                <td className="px-4 py-3">{order.city}</td>
                <td className="px-4 py-3">{experienceTitle(experiences, order.experienceId)}</td>
                <td className="px-4 py-3">{order.scheduleLabel}</td>
                <td className="px-4 py-3">{formatTime(order.time)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-800"
                  >
                    {compact ? 'View' : 'Open'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
