import { useMemo, useState } from 'react'
import { experiences } from '../../data/experiences'
import { STATUS_LABELS, useAdminStore } from '../adminStore'
import { OrdersTable } from '../components/OrdersTable'

export default function AdminOrders() {
  const { orders } = useAdminStore()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const [experienceId, setExperienceId] = useState('')

  const cities = useMemo(
    () => [...new Set(orders.map((order) => order.city))].sort(),
    [orders],
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return orders.filter((order) => {
      const haystack = `${order.id} ${order.recipientName} ${order.city}`.toLowerCase()
      const matchesQuery = !needle || haystack.includes(needle)
      const matchesCity = !city || order.city === city
      const matchesStatus = !status || order.status === status
      const matchesExperience = !experienceId || order.experienceId === experienceId
      return matchesQuery && matchesCity && matchesStatus && matchesExperience
    })
  }, [orders, query, city, status, experienceId])

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Orders</h1>
      <p className="mt-1 text-sm text-slate-500">{filtered.length} of {orders.length} surprises</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search booking, recipient, city"
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All cities</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={experienceId}
          onChange={(event) => setExperienceId(event.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All experiences</option>
          {experiences.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {filtered.length ? (
          <OrdersTable orders={filtered} />
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-500">
            No orders match these filters.
          </p>
        )}
      </div>
    </div>
  )
}
