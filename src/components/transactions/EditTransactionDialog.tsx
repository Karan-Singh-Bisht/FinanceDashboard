import { useEffect, useState } from 'react'
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

type EditTransactionDialogProps = {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updated: Transaction) => void
}

const EditTransactionDialog = ({
  transaction,
  open,
  onOpenChange,
  onSave,
}: EditTransactionDialogProps) => {
  const [form, setForm] = useState<Transaction | null>(null)

  useEffect(() => {
    if (transaction) {
      setForm({ ...transaction })
    }
  }, [transaction])

  if (!form) return null

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form) {
      const amount =
        form.type === 'Expense'
          ? -Math.abs(form.amount)
          : Math.abs(form.amount)
      onSave({ ...form, amount })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            Edit Transaction
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Update the transaction details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 py-2">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="merchant">Merchant</Label>
            <Input
              id="merchant"
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
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
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
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
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
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={Math.abs(form.amount)}
              onChange={(e) =>
                handleChange('amount', parseFloat(e.target.value) || 0)
              }
              className="rounded-xl"
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-[#c7af00] text-white hover:bg-[#b59e00] dark:bg-[#ffd84d] dark:text-slate-900 dark:hover:bg-[#ffd84d]/80"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTransactionDialog
