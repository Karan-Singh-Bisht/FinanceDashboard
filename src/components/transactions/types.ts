export type TransactionType = 'Income' | 'Expense'

export type TransactionCategory =
  | 'Food & Dining'
  | 'Transport'
  | 'Salary'
  | 'Shopping'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Freelance'

export type Transaction = {
  id: string
  date: string
  description: string
  merchant: string
  category: TransactionCategory
  type: TransactionType
  amount: number
}
