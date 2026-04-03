import { ArrowUpRight, Download, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchTransactions, addTransaction } from '@/redux/transactionsSlice'
import { exportReportCSV } from '@/lib/exportReport'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { AddTransactionDialog } from '@/components/transactions'
import type { Transaction } from '@/components/transactions'
import { useRole } from '@/context/role-context'

const BalanceOverview = () => {
  const dispatch = useAppDispatch()
  const { items: transactions, status } = useAppSelector((state) => state.transactions)
  const { isAdmin } = useRole()
  const [isAddOpen, setIsAddOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions())
    }
  }, [status, dispatch])

  const totalBalance = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  )

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

  const handleExport = () => {
    exportReportCSV({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      transactions,
    })
  }

  const handleAdd = useCallback(
    (transaction: Transaction) => {
      dispatch(addTransaction(transaction))
    },
    [dispatch]
  )

  return (
  <>
    <Card className="rounded-[2rem] h-full min-w-0 overflow-hidden border-none bg-white py-0 shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <CardHeader className="px-5 pt-6 pb-0 sm:px-8 sm:pt-8">
        <CardDescription className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Total balance
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
        <CardTitle className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white break-all sm:break-normal">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </CardTitle>
        <Badge
          variant="secondary"
          className="mt-3 rounded-full border-none bg-[#fef9e0] px-3 py-1 text-sm font-semibold text-[#8b7b00] dark:bg-[#ffd84d]/15 dark:text-[#ffd84d]"
        >
          <ArrowUpRight className="size-3.5!" />
          +12.5% from last month
        </Badge>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-10">
          {isAdmin && (
          <Button
            className="rounded-full bg-[#c7af00] px-4 py-2.5 text-sm font-bold text-white shadow-none hover:bg-[#b59e00] h-auto sm:px-6 sm:py-3 dark:bg-[#ffd84d] dark:text-slate-900 dark:hover:bg-[#ffd84d]/80"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="size-4!" />
            Add Transaction
          </Button>
          )}
          <Button
            variant="secondary"
            className="rounded-full bg-[#efede7] px-4 py-2.5 text-sm font-bold text-slate-700 shadow-none hover:bg-[#e5e3dc] h-auto border-none sm:px-6 sm:py-3 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
            onClick={handleExport}
          >
            <Download className="size-4!" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>

    <AddTransactionDialog
      open={isAddOpen}
      onOpenChange={setIsAddOpen}
      onAdd={handleAdd}
    />
  </>
  )
}

export default BalanceOverview
