import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { month: 'Jan', balance: 18200 },
  { month: 'Feb', balance: 19500 },
  { month: 'Mar', balance: 19100 },
  { month: 'Apr', balance: 21400 },
  { month: 'May', balance: 22800 },
  { month: 'Jun', balance: 24500 },
]

const chartConfig = {
  balance: {
    label: 'Balance',
    color: '#c7af00',
  },
} satisfies ChartConfig

const BalanceTrendChart = () => {
  return (
    <Card className="rounded-[2rem] min-w-0 overflow-hidden border-none bg-white py-0 shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <CardHeader className="px-5 pt-6 pb-0 sm:px-8 sm:pt-8">
        <div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Balance Trend
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            6-month growth trajectory
          </CardDescription>
        </div>
        <CardAction>
          <Badge
            variant="secondary"
            className="rounded-full border-none bg-[#eef2e7] px-4 py-2 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-400"
          >
            Line
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
        <ChartContainer config={chartConfig} className="mt-4 h-52 w-full aspect-auto! sm:mt-6 sm:h-64 md:h-84">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd84d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ffd84d" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e8e8e0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              dx={-5}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    'Balance',
                  ]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#c7af00"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: '#c7af00',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BalanceTrendChart
