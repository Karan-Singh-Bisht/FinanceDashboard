import { useCallback, useEffect, useMemo, useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  TransactionFilters,
  TransactionTable,
  TransactionPagination,
  MonthlyOutflowCard,
  EditTransactionDialog,
  AddTransactionDialog,
} from '@/components/transactions'
import type { Transaction } from '@/components/transactions'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
  addTransaction,
} from '@/redux/transactionsSlice'
import { exportReportCSV } from '@/lib/exportReport'
import { useRole } from '@/context/role-context'
import { TransactionsSkeleton } from '@/components/skeletons'

const ITEMS_PER_PAGE = 10

const Transactions = () => {
  const dispatch = useAppDispatch()
  const { items: transactions, status } = useAppSelector((state) => state.transactions)
  const { isAdmin } = useRole()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [type, setType] = useState('All Types')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions())
    }
  }, [status, dispatch])

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        !search ||
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.merchant.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'All Categories' || tx.category === category
      const matchesType = type === 'All Types' || tx.type === type
      return matchesSearch && matchesCategory && matchesType
    })
  }, [transactions, search, category, type])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (
    setter: (v: string) => void,
    value: string
  ) => {
    setter(value)
    setCurrentPage(1)
  }

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteTransaction(id))
    },
    [dispatch]
  )

  const handleEdit = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsEditOpen(true)
  }, [])

  const handleSave = useCallback(
    (updated: Transaction) => {
      dispatch(updateTransaction(updated))
    },
    [dispatch]
  )

  const handleAdd = useCallback(
    (transaction: Transaction) => {
      dispatch(addTransaction(transaction))
    },
    [dispatch]
  )

  const handleExport = () => {
    const monthlyIncome = transactions
      .filter((tx) => tx.type === 'Income')
      .reduce((sum, tx) => sum + tx.amount, 0)
    const monthlyExpenses = transactions
      .filter((tx) => tx.type === 'Expense')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
    const totalBalance = monthlyIncome - monthlyExpenses

    exportReportCSV({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      transactions,
    })
  }

  if (status === 'idle' || status === 'loading') return <TransactionsSkeleton />

  return (
    <motion.section
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Ledger Records
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Recent Transactions
          </h1>
        </div>
        <div className="flex gap-2 self-start">
          <Button
            variant="outline"
            className="h-auto rounded-full border-slate-200 px-4 py-2.5 text-sm font-bold shadow-none sm:px-6 sm:py-3 dark:border-white/10"
            onClick={handleExport}
          >
            <Download className="size-4!" />
            Export
          </Button>
          {isAdmin && (
          <Button
            className="h-auto rounded-full bg-[#c7af00] px-4 py-2.5 text-sm font-bold text-white shadow-none hover:bg-[#b59e00] sm:px-6 sm:py-3 dark:bg-[#ffd84d] dark:text-slate-900 dark:hover:bg-[#ffd84d]/80"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="size-4!" />
            Add Transaction
          </Button>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-start"
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      >
        <div className="flex-1">
          <TransactionFilters
            search={search}
            onSearchChange={(v) => handleFilterChange(setSearch, v)}
            category={category}
            onCategoryChange={(v) => handleFilterChange(setCategory, v)}
            type={type}
            onTypeChange={(v) => handleFilterChange(setType, v)}
          />
        </div>
        <MonthlyOutflowCard />
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      >
      <Card className="rounded-[2rem] border-none bg-white py-0 shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <CardContent className="p-2 sm:p-6">
          <TransactionTable
            transactions={paginated}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }}
      >
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
      </motion.div>

      <EditTransactionDialog
        transaction={editingTransaction}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSave}
      />

      <AddTransactionDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onAdd={handleAdd}
      />
    </motion.section>
  )
}

export default Transactions