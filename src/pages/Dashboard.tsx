import { TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { easeOut, motion } from 'framer-motion'
import {
  BalanceOverview,
  StatCard,
  BalanceTrendChart,
  AdminPanel,
} from '@/components/dashboard'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchTransactions } from '@/redux/transactionsSlice'
import { DashboardSkeleton } from '@/components/skeletons'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
}

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { items: transactions, status } = useAppSelector((state) => state.transactions)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions())
    }
  }, [status, dispatch])

  const monthlyIncome = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === 'Income')
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  )

  const monthlyExpenses = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === 'Expense')
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
    [transactions]
  )

  if (status === 'idle' || status === 'loading') return <DashboardSkeleton />

  return (
    <motion.section
      className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,320px)]"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <div className="min-w-0 grid gap-6">
        <div className="min-w-0 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <motion.div className="min-w-0 overflow-hidden" variants={fadeUp}>
            <BalanceOverview />
          </motion.div>

          <motion.div className="min-w-0 grid gap-6" variants={stagger}>
            <motion.div className="min-w-0 overflow-hidden" variants={fadeUp}>
              <StatCard
                label="Monthly income"
                value={`$${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                icon={TrendingUp}
              />
            </motion.div>
            <motion.div className="min-w-0 overflow-hidden" variants={fadeUp}>
              <StatCard
                label="Monthly expenses"
                value={`$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                icon={TrendingDown}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="min-w-0 overflow-hidden" variants={fadeUp}>
          <BalanceTrendChart />
        </motion.div>
      </div>

      <motion.div className="min-w-0 overflow-hidden" variants={fadeUp}>
        <AdminPanel />
      </motion.div>
    </motion.section>
  )
}

export default Dashboard;
