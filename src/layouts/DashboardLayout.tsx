import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

/*
  {

  Dashboard Layout
  Includes sidebar and navbar

  }
*/

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#dbe2d3] text-slate-900 dark:bg-[#0f1210] dark:text-slate-100">
      <div className="mx-auto flex overflow-hidden border border-white/60 bg-[#f7f8f2] shadow-[0_24px_80px_rgba(64,76,50,0.16)] h-screen max-w-full dark:border-white/10 dark:bg-[#181c18] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        {/* Desktop sidebar */}
        <motion.div
          className="hidden lg:block overflow-hidden"
          initial={false}
          animate={{ width: isDesktopSidebarOpen ? 288 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Sidebar />
        </motion.div>

        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/30"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              {/* Sidebar panel */}
              <motion.div
                className="relative h-full w-72"
                initial={{ x: -288 }}
                animate={{ x: 0 }}
                exit={{ x: -288 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(event) => event.stopPropagation()}
              >
                <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8f2] dark:bg-[#181c18]">
          {/* Mobile hamburger */}
          <div className="border-b border-black/5 px-4 py-3 sm:px-6 sm:py-4 lg:hidden dark:border-white/5">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10"
            >
              <Menu size={18} />
            </button>
          </div>

          <Navbar
            isSidebarOpen={isDesktopSidebarOpen}
            onToggleSidebar={() => setIsDesktopSidebarOpen((prev) => !prev)}
          />

          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
