import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  'All Categories',
  'Food & Dining',
  'Transport',
  'Salary',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Freelance',
]

const types = ['All Types', 'Income', 'Expense']

type TransactionFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  type: string
  onTypeChange: (value: string) => void
}

const TransactionFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  type,
  onTypeChange,
}: TransactionFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />
        <Input
          placeholder="Search by description or merchant..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 rounded-xl border-black/10 bg-white pl-9 text-sm dark:border-white/10 dark:bg-white/5"
        />
      </div>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-10 w-full rounded-xl border-black/10 bg-white text-sm sm:w-40 dark:border-white/10 dark:bg-white/5">
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
      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="h-10 w-full rounded-xl border-black/10 bg-white text-sm sm:w-35 dark:border-white/10 dark:bg-white/5">
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
  )
}

export default TransactionFilters
