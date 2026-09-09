import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AdminStoreProvider } from './adminStore'

const nav = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/partners', label: 'Partners' },
  { to: '/admin/experiences', label: 'Experiences' },
]

function navClass({ isActive }) {
  return `block rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
  }`
}

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-800 px-5 py-5">
        <p className="text-base font-semibold tracking-tight text-white">Surprise</p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          Operations
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navClass}
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-3 py-4">
        <NavLink to="/admin/settings" className={navClass} onClick={onNavigate}>
          Settings
        </NavLink>
      </div>
    </div>
  )
}

function AdminShell() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const overlay = useMemo(
    () =>
      open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close menu"
          onClick={close}
        />
      ) : null,
    [open],
  )

  return (
    <div className="admin-shell min-h-svh bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 bg-slate-900 lg:block">
        <Sidebar />
      </aside>

      {overlay}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 transition-transform lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onNavigate={close} />
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-slate-800" />
              <span className="block h-0.5 w-4 bg-slate-800" />
              <span className="block h-0.5 w-4 bg-slate-800" />
            </span>
          </button>
          <div>
            <p className="text-sm font-semibold">Surprise</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Operations</p>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  return (
    <AdminStoreProvider>
      <AdminShell />
    </AdminStoreProvider>
  )
}
