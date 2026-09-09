import { adminKpis } from '../../data/adminKpis'
import { useAdminStore } from '../adminStore'
import { OrdersTable } from '../components/OrdersTable'

export default function AdminOverview() {
  const { orders } = useAdminStore()
  const today = orders.filter((order) => order.showOnOverview)

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Good morning 👋</h1>
      <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with today&apos;s surprises.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <div key={kpi.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kpi.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Today&apos;s Surprises</h2>
        <OrdersTable orders={today} compact />
      </section>
    </div>
  )
}
