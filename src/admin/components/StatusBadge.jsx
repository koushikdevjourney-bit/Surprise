import { STATUS_LABELS } from '../adminStore'

const styles = {
  new: 'bg-sky-100 text-sky-800',
  assigned: 'bg-indigo-100 text-indigo-800',
  preparing: 'bg-amber-100 text-amber-800',
  'on-the-way': 'bg-cyan-100 text-cyan-800',
  completed: 'bg-emerald-100 text-emerald-800',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${styles[status] ?? 'bg-slate-100 text-slate-700'}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}
