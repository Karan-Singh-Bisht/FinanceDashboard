import { Shield, RefreshCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import SpendingPieChart from './SpendingPieChart'

const controlItems = [
  {
    icon: Shield,
    title: 'Security Audit',
    description: 'Last scan 2h ago',
  },
  {
    icon: RefreshCcw,
    title: 'Reconcile Accounts',
    description: '3 pending adjustments',
  },
]

const AdminPanel = () => {
  return (
    <div className='flex flex-col gap-6'>
        <aside className="rounded-[2rem] bg-[#2d372d] p-4 text-white shadow-[0_20px_60px_rgba(45,55,45,0.22)]">
        <Badge className="rounded-full border-none bg-[#4b5a47] px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f4df70]">
            Admin hub
        </Badge>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Core Controls
        </h3>

        <div className="mt-4 space-y-4">
            {controlItems.map((item) => (
            <Card
                key={item.title}
                className="rounded-[1.5rem] border-white/10 bg-white/5 shadow-none"
            >
                <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                    <item.icon size={16} />
                </div>
                <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/60">{item.description}</p>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </aside>
        <div>
            <SpendingPieChart />
        </div>
    </div>
  )
}

export default AdminPanel
