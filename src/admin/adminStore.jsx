import { createContext, useContext, useMemo, useState } from 'react'
import { adminOrders as seedOrders } from '../data/adminOrders'
import { partners } from '../data/partners'

const STORAGE_KEY = 'surprise.admin.orders'

export const STATUS_FLOW = ['new', 'assigned', 'preparing', 'on-the-way', 'completed']

export const STATUS_LABELS = {
  new: 'New',
  assigned: 'Assigned',
  preparing: 'Preparing',
  'on-the-way': 'On the way',
  completed: 'Completed',
}

export const NEXT_ACTION_LABELS = {
  new: 'Mark as Assigned',
  assigned: 'Mark as Preparing',
  preparing: 'Mark as On the Way',
  'on-the-way': 'Mark as Completed',
}

function loadOrders() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return seedOrders
    const stored = JSON.parse(raw)
    return Array.isArray(stored) ? stored : seedOrders
  } catch {
    return seedOrders
  }
}

function persist(orders) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

const AdminStoreContext = createContext(null)

export function AdminStoreProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  function assignPartner(orderId, partnerId) {
    setOrders((current) => {
      const next = current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              partnerId,
              status: order.status === 'new' ? 'assigned' : order.status,
            }
          : order,
      )
      persist(next)
      return next
    })
  }

  function advanceStatus(orderId) {
    setOrders((current) => {
      const next = current.map((order) => {
        if (order.id !== orderId) return order
        const upcoming = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]
        return upcoming ? { ...order, status: upcoming } : order
      })
      persist(next)
      return next
    })
  }

  const value = useMemo(
    () => ({ orders, partners, assignPartner, advanceStatus }),
    [orders],
  )

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>
}

export function useAdminStore() {
  const context = useContext(AdminStoreContext)
  if (!context) {
    throw new Error('useAdminStore must be used within AdminStoreProvider')
  }
  return context
}
