import { getAdminExperiences } from '../../data/adminExperiences'

export default function AdminExperiences() {
  const items = getAdminExperiences()

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Experiences</h1>
      <p className="mt-1 text-sm text-slate-500">Catalog available to the operations team</p>

      <div className="mt-6 grid gap-4 md:hidden">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-slate-900">
                {item.emoji} {item.title}
              </p>
              <OpsStatus value={item.opsStatus} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.startingPrice}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.cities.join(', ')}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Starting price</th>
              <th className="px-4 py-3">Cities available</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {item.emoji} {item.title}
                </td>
                <td className="px-4 py-3">{item.startingPrice}</td>
                <td className="px-4 py-3 text-slate-600">{item.cities.join(', ')}</td>
                <td className="px-4 py-3">
                  <OpsStatus value={item.opsStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OpsStatus({ value }) {
  const limited = value === 'Limited'
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${
        limited ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
      }`}
    >
      {value}
    </span>
  )
}
