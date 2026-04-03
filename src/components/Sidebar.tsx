import { BarChart3, CreditCard, LayoutDashboard, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRole } from '@/context/role-context'

const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Transactions', icon: CreditCard, to: '/transactions' },
  { label: 'Insights', icon: BarChart3, to: '/financialInsights' }
]

type SidebarProps = {
  onClose?: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { isAdmin, toggleRole } = useRole()

  return (
    <aside className="flex h-full min-h-full w-72 shrink-0 flex-col border-r border-black/5 bg-[#eef2e7] px-5 py-6 text-slate-800 dark:border-white/5 dark:bg-[#1a1f1a] dark:text-slate-200">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-extrabold tracking-tight">Luminous Ledger</h1>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm ring-1 ring-black/5 lg:hidden dark:bg-white/10 dark:text-slate-300 dark:ring-white/10"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="mt-10 flex-1 space-y-2">
        {navigationItems.map(({ label, icon: Icon, to }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#ffd84d] text-slate-900 shadow-sm dark:bg-[#ffd84d]/90'
                    : 'text-slate-600 hover:bg-white/70 dark:text-slate-400 dark:hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ) : (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-white/70 dark:text-slate-400 dark:hover:bg-white/10"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          )
        )}
      </nav>

      <div
        className="mt-auto cursor-pointer rounded-3xl border border-white/60 bg-white/40 p-4 dark:border-white/10 dark:bg-white/5"
        onClick={toggleRole}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {isAdmin ? 'Switch to user' : 'Switch to admin'}
        </p>
        <div
          className={`mt-4 flex h-7 w-12 items-center rounded-full px-1 transition-colors duration-300 ${
            isAdmin
              ? 'justify-end bg-[#ffd84d] dark:bg-[#ffd84d]'
              : 'justify-start bg-[#d9dfcf] dark:bg-white/15'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`h-5 w-5 rounded-full ${
              isAdmin
                ? 'bg-slate-900 dark:bg-slate-900'
                : 'bg-[#7d6f00] dark:bg-[#ffd84d]'
            }`}
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
