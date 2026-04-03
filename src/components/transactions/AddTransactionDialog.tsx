import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Transaction, TransactionCategory, TransactionType } from './types'

const categories: TransactionCategory[] = [
  'Food & Dining',
  'Transport',
  'Salary',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Freelance',
]

const types: TransactionType[] = ['Income', 'Expense']

const emptyForm = {
  date: '',
  description: '',
  merchant: '',
  category: '' as TransactionCategory,
  type: '' as TransactionType,
  amount: 0,
}

type AddTransactionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (transaction: Transaction) => void
}

const AddTransactionDialog = ({
  open,
  onOpenChange,
  onAdd,
}: AddTransactionDialogProps) => {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => setForm(emptyForm)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.date || !form.description || !form.category || !form.type) return

    const amount =
      form.type === 'Expense'
        ? -Math.abs(form.amount)
        : Math.abs(form.amount)

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      date: form.date,
      description: form.description,
      merchant: form.merchant,
      category: form.category,
      type: form.type,
      amount,
    }

    onAdd(transaction)
    resetForm()
    onOpenChange(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm()
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            Add Transaction
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Fill in the details for the new transaction.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 py-2">
          <div className="grid gap-2">
            <Label htmlFor="add-date">Date</Label>
            <Input
              id="add-date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="rounded-xl"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="add-description">Description</Label>
            <Input
              id="add-description"
              placeholder="e.g. Coffee Shop"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="rounded-xl"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="add-merchant">Merchant</Label>
            <Input
              id="add-merchant"
              placeholder="e.g. Merchant · POS-12345"
              value={form.merchant}
              onChange={(e) => handleChange('merchant', e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  handleChange('category', v as TransactionCategory)
                }
                required
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  handleChange('type', v as TransactionType)
                }
                required
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {types.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="add-amount">Amount ($)</Label>
            <Input
              id="add-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount || ''}
              onChange={(e) =>
                handleChange('amount', parseFloat(e.target.value) || 0)
              }
              className="rounded-xl"
              required
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-[#c7af00] text-white hover:bg-[#b59e00] dark:bg-[#ffd84d] dark:text-slate-900 dark:hover:bg-[#ffd84d]/80"
            >
              Add Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialog
