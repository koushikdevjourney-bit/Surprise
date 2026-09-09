import { useAdminStore } from '../adminStore'

export default function AdminPartners() {
  const { partners } = useAdminStore()

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Partners</h1>
      <p className="mt-1 text-sm text-slate-500">{partners.length} local crews and performers</p>

      <div className="mt-6 grid gap-4 md:hidden">
        {partners.map((partner) => (
          <article key={partner.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{partner.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {partner.city} · {partner.type}
                </p>
              </div>
              <Availability value={partner.availability} />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {partner.rating} · {partner.completed} completed
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Completed Surprises</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{partner.name}</td>
                <td className="px-4 py-3">{partner.city}</td>
                <td className="px-4 py-3">{partner.type}</td>
                <td className="px-4 py-3 tabular-nums">{partner.rating}</td>
                <td className="px-4 py-3">
                  <Availability value={partner.availability} />
                </td>
                <td className="px-4 py-3 tabular-nums">{partner.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Availability({ value }) {
  const busy = value === 'Busy'
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${
        busy ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
      }`}
    >
      {value}
    </span>
  )
}
