import { Pencil, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Transaction } from './types'
import { categoryIcons } from './data'
import { useRole } from '@/context/role-context'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return dateStr
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

type TransactionTableProps = {
  transactions: Transaction[]
  onDelete?: (id: string) => void
  onEdit?: (transaction: Transaction) => void
}

const TransactionTable = ({ transactions, onDelete, onEdit }: TransactionTableProps) => {
  const { isAdmin } = useRole()

  return (
    <div className="overflow-x-auto -mx-2 sm:mx-0">
    <Table className="min-w-150">
      <TableHeader>
        <TableRow className="border-black/5 hover:bg-transparent dark:border-white/5">
          <TableHead className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Date
          </TableHead>
          <TableHead className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Description
          </TableHead>
          <TableHead className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Category
          </TableHead>
          <TableHead className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Type
          </TableHead>
          <TableHead className="text-right text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Amount
          </TableHead>
          {isAdmin && (
            <TableHead className="text-right text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence mode="popLayout">
        {transactions.map((tx, index) => (
          <motion.tr
            key={tx.id}
            className="border-b border-black/5 dark:border-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            layout
          >
            <TableCell className="py-5 text-sm text-slate-500 dark:text-slate-400">
              {formatDate(tx.date)}
            </TableCell>
            <TableCell className="py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2e7] text-lg dark:bg-white/10">
                  {categoryIcons[tx.category] ?? '📄'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {tx.description}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {tx.merchant}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-5">
              <Badge
                variant="outline"
                className="rounded-lg border-black/10 bg-[#fefdf5] px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tx.category}
              </Badge>
            </TableCell>
            <TableCell className="py-5">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    tx.type === 'Income' ? 'bg-emerald-500' : 'bg-red-400'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    tx.type === 'Income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {tx.type}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-5 text-right">
              <span
                className={`text-sm font-bold ${
                  tx.amount >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {tx.amount >= 0 ? '+' : '-'}$
                {Math.abs(tx.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </TableCell>
            {isAdmin && (
              <TableCell className="py-5 text-right">
                <motion.div
                  className="flex items-center justify-end gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                    onClick={() => onEdit?.(tx)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
                    onClick={() => onDelete?.(tx.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </motion.div>
              </TableCell>
            )}
          </motion.tr>
        ))}
        </AnimatePresence>
        {transactions.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={isAdmin ? 6 : 5}
              className="py-12 text-center text-slate-400 dark:text-slate-500"
            >
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  )
}

export default TransactionTable
