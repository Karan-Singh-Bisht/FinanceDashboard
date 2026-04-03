import { Bell, CircleHelp, PanelLeftClose, PanelLeftOpen, UserCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModeToggle } from './mode-toggle'
import { useRole } from '@/context/role-context'

type NavbarProps = {
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const Navbar = ({ isSidebarOpen, onToggleSidebar }: NavbarProps) => {
  const { isAdmin, role } = useRole()

  return (
    <header className={`flex-row justify-between flex gap-4 border-b border-black/5 bg-white/60 px-4 py-4 backdrop-blur sm:px-6 sm:py-5 dark:border-white/5 dark:bg-white/5`}>
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-black/5 transition hover:bg-slate-50 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-white/15"
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        )}
        <div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">Welcome back</p>
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Finance Dashboard
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:gap-3 sm:self-auto">
        <ModeToggle />
       
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-black/5 sm:h-10 sm:w-10 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10"
        >
          <Bell size={18} />
        </button>
        <button
          type="button"
          className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10"
        >
          <CircleHelp size={18} />
        </button>
        <motion.button
          type="button"
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold shadow-sm ${
            isAdmin
              ? 'bg-[#2d372d] text-white'
              : 'bg-slate-200 text-slate-700 dark:bg-white/15 dark:text-slate-300'
          }`}
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <UserCircle2 size={18} />
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              className="capitalize"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {role}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  )
}

export default Navbar
