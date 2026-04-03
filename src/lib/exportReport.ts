import type { Transaction } from '@/components/transactions/types'

type ReportData = {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  transactions: Transaction[]
}

/*
    Exports the financial report as a CSV file.
*/

export function exportReportCSV({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  transactions,
}: ReportData) {
  const rows: string[] = []

  rows.push('FINANCIAL REPORT')
  rows.push('')
  rows.push('Metric,Value')
  rows.push(`Total Balance,"$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}"`)
  rows.push(`Monthly Income,"$${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}"`)
  rows.push(`Monthly Expenses,"$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}"`)
  rows.push('')

  rows.push('TRANSACTIONS')
  rows.push('Date,Description,Merchant,Category,Type,Amount')

  for (const tx of transactions) {
    const rawAmount = tx.amount >= 0
      ? `$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      : `-$${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    const amount = `"${rawAmount}"`

    const description = `"${tx.description.replace(/"/g, '""')}"`
    const merchant = `"${tx.merchant.replace(/"/g, '""')}"`

    const dateObj = new Date(tx.date + 'T00:00:00')
    let formattedDate = tx.date
    if (!isNaN(dateObj.getTime())) {
      const dd = String(dateObj.getDate()).padStart(2, '0')
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
      const yyyy = dateObj.getFullYear()
      formattedDate = `${dd}/${mm}/${yyyy}`
    }

    rows.push(`${formattedDate},${description},${merchant},${tx.category},${tx.type},${amount}`)
  }

  const csvContent = rows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `luminous-ledger-report-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
