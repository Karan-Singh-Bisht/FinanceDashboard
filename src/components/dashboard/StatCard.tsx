import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type StatCardProps = {
  label: string
  value: string
  icon?: LucideIcon
}

const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <Card className="rounded-[2rem] border-none bg-[#eef2e7] py-0 shadow-none overflow-hidden dark:bg-white/5">
      <CardContent className="flex items-start justify-between flex-col gap-4 p-5 sm:p-6">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-slate-500 dark:bg-white/10 dark:text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <div className="min-w-0 w-full">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-3 sm:text-3xl dark:text-white truncate">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
