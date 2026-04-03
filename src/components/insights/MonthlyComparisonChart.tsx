import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { useIsMobile } from '@/hooks/useMobile'

const chartData = [
  { month: 'JUN', income: 4200, expenses: 3100 },
  { month: 'JUL', income: 4500, expenses: 3800 },
  { month: 'AUG', income: 4800, expenses: 3400 },
  { month: 'SEP', income: 5100, expenses: 4200 },
  { month: 'OCT', income: 5000, expenses: 4000 },
  { month: 'NOV', income: 4300, expenses: 3800 },
]

const chartConfig = {
  income: {
    label: 'Income',
    color: '#c7af00',
  },
  expenses: {
    label: 'Expenses',
    color: '#7d6f00',
  },
} satisfies ChartConfig

const MonthlyComparisonChart = () => {
  const isMobile = useIsMobile()

  return (
    <Card className="rounded-[2rem] border-none bg-white py-0 shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <CardHeader className="flex flex-col gap-3 px-5 pt-6 pb-0 sm:flex-row sm:justify-between sm:px-8 sm:pt-8">
        <div>
          <CardTitle className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl dark:text-white">
            Monthly Comparison
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Income vs. Expenses (Last 4 Months)
          </CardDescription>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c7af00]" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Income
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7d6f00]" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Expenses
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
        <ChartContainer config={chartConfig} className="mt-4 h-48 w-full sm:h-56 md:h-64">
          <BarChart
            data={chartData}
            barGap={isMobile ? 2 : 4}
            margin={{
              top: 10,
              right: 0,
              left: isMobile ? -70 : -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border, #e8e8e0)"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#94a3b8',
                fontSize: isMobile ? 10 : 12,
                fontWeight: 600,
              }}
              dy={10}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="income"
              fill="#c7af00"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="expenses"
              fill="#7d6f00"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default MonthlyComparisonChart
