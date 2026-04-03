import { Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const PrimaryAllocation = () => {
  return (
    <Card className="relative h-full overflow-hidden rounded-[2rem] border-none bg-white py-0 shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <CardContent className="flex h-full flex-col justify-between p-5 sm:p-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Home size={14} className="text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              Primary Allocation
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Housing
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Your primary expenditure remains focused on residential maintenance
            and utility overheads.
          </p>
        </div>

        <div className="relative mt-8">
          {/* Large watermark number */}
          <span className="pointer-events-none absolute -bottom-2 left-4 select-none text-[4rem] font-black leading-none text-[#ffd84d]/20 sm:left-8 sm:text-[6rem] dark:text-[#ffd84d]/10">
            35%
          </span>

          <div className="relative z-10 flex items-end gap-2">
            <span className="text-2xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              35%
            </span>
            <span className="mb-1 text-sm text-slate-500 dark:text-slate-400">
              of Total Spend
            </span>
          </div>

          <Progress
            value={35}
            className="mt-4 h-2.5 rounded-full bg-[#eef2e7] dark:bg-white/10 [&>div]:rounded-full [&>div]:bg-[#c7af00]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PrimaryAllocation
