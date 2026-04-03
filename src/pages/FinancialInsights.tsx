import { TrendingUp, Landmark, Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  PrimaryAllocation,
  MonthlyComparisonChart,
  SmartTipCard,
  InsightStatCard,
} from '@/components/insights'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const FinancialInsights = () => {
  return (
    <motion.div
      className="relative space-y-6 sm:space-y-8"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Financial Insights
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          A curated narrative of your capital flow for Q3 2023.
        </p>
      </motion.div>

      <motion.div className="grid gap-6 lg:grid-cols-2" variants={stagger}>
        <motion.div variants={fadeUp}>
          <PrimaryAllocation />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MonthlyComparisonChart />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <SmartTipCard />
      </motion.div>

      <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger}>
        <motion.div variants={fadeUp}>
          <InsightStatCard
            label="Savings Rate"
            value="24.2%"
            subtitle="+2.1% from previous quarter"
            icon={TrendingUp}
            accentColor="#c7af00"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <InsightStatCard
            label="DTI Ratio"
            value="18.5%"
            subtitle="Well within healthy threshold"
            icon={Landmark}
            accentColor="#7d6f00"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <InsightStatCard
            label="Wealth Velocity"
            value="1.4x"
            subtitle="Relative to benchmark peer group"
            icon={Compass}
            accentColor="#d97706"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FinancialInsights