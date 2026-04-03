import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type InsightStatCardProps = {
  label: string
  value: string
  subtitle: string
  icon: LucideIcon
  accentColor?: string
}

const InsightStatCard = ({
  label,
  value,
  subtitle,
  icon: Icon,
  accentColor = '#c7af00',
}: InsightStatCardProps) => {
  return (
    <Card className="rounded-[2rem] border-none bg-[#fefdf5] py-0 shadow-[0_10px_40px_rgba(97,110,77,0.08)] dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <Badge
            className="rounded-lg border-none px-2 py-1 text-[10px] font-bold italic sm:px-3 sm:py-1.5 sm:text-xs"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {label}
          </Badge>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            <Icon size={16} />
          </div>
        </div>

        <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:mt-5 sm:text-4xl dark:text-white">
          {value}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  )
}

export default InsightStatCard
