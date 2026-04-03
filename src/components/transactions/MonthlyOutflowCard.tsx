import { ArrowDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppSelector } from '@/redux/hooks'

const MonthlyOutflowCard = () => {
  const transactions = useAppSelector((state) => state.transactions.items)

  const totalOutflow = transactions
    .filter((tx) => tx.type === 'Expense')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)

  return (
    <Card className="rounded-2xl border-none bg-[#eef2e7] py-0 shadow-none lg:w-auto dark:bg-white/5">
      <CardContent className="px-3 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Total Monthly Outflow
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-red-500 dark:text-red-400">
            -${totalOutflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <Badge
            variant="secondary"
            className="rounded-full border-none bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-500 dark:bg-red-500/15 dark:text-red-400"
          >
            <ArrowDownRight className="size-2.5!" />
            12%
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default MonthlyOutflowCard
