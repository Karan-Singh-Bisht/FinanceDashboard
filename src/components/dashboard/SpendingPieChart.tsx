import { useMemo } from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { useAppSelector } from '@/redux/hooks'

const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': '#ffd84d',
  "Transport": '#8b6d14',
  'Shopping': '#d9dfcf',
  'Utilities': '#4b5a47',
  'Entertainment': '#a3b18a',
  'Healthcare': '#7a9e7e',
  'Salary': '#c2a83e',
  'Freelance': '#5e7a5a',
}

const SpendingPieChart = () => {
  const transactions = useAppSelector((state) => state.transactions.items)

  const { spendingData, chartConfig, totalSpending } = useMemo(() => {
    const categoryMap = new Map<string, number>()

    for (const tx of transactions) {
      if (tx.type === 'Expense') {
        const amount = Math.abs(tx.amount)
        categoryMap.set(tx.category, (categoryMap.get(tx.category) ?? 0) + amount)
      }
    }

    const data = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category: category.toLowerCase().replace(/\s+&\s+/g, '-'),
        label: category,
        amount: Math.round(amount * 100) / 100,
        fill: CATEGORY_COLORS[category] ?? '#999',
      }))
      .sort((a, b) => b.amount - a.amount)

    const config: ChartConfig = {}
    for (const item of data) {
      config[item.category] = { label: item.label, color: item.fill }
    }

    const total = data.reduce((sum, item) => sum + item.amount, 0)

    return { spendingData: data, chartConfig: config, totalSpending: total }
  }, [transactions])

  return (
    <div className="rounded-[1.5rem] h-full dark:bg-white/5 bg-white p-4 sm:p-6">
      <h4 className="text-xl font-bold">Spending</h4>
      <p className="mt-1 text-sm">By category</p>

      {spendingData.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-400">No expenses yet</p>
      ) : (
        <>
          <ChartContainer
            config={chartConfig}
            className="mx-auto mt-4 aspect-square h-48"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    hideLabel
                  />
                }
              />
              <Pie
                data={spendingData}
                dataKey="amount"
                nameKey="category"
                innerRadius={55}
                outerRadius={80}
                strokeWidth={3}
                stroke="rgba(45,55,45,0.8)"
              >
                {spendingData.map((entry) => (
                  <Cell key={entry.category} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) - 8}
                            className="fill-slate-900 dark:fill-white text-2xl font-bold"
                          >
                            ${totalSpending >= 1000
                              ? `${(totalSpending / 1000).toFixed(1)}k`
                              : totalSpending.toFixed(0)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) + 12}
                            className="fill-slate-500 dark:fill-slate-400 text-xs"
                          >
                            Total
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="mt-4 space-y-3 text-sm">
            {spendingData.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SpendingPieChart
