import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const SmartTipCard = () => {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-none bg-[#2d372d] shadow-[0_20px_60px_rgba(97,110,77,0.12)] dark:bg-[#1a2a1a] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <CardContent className="flex flex-col items-start gap-6 p-5 sm:p-8 md:flex-row md:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#3a4a3a] sm:h-40 sm:w-40">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <img loading='lazy' decoding='async' src="/images/moneyIncrease.webp"/>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Badge className="rounded-full border-none bg-[#3a4a3a] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#ffd84d]">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#ffd84d]" />
            Smart Tip Opportunity
          </Badge>

          <h3 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Optimization: Unused Subscriptions
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Our analysis detects{' '}
            <span className="font-semibold text-white">$42.00</span> in monthly
            recurring charges for services with zero engagement in the last 90
            days. Redirecting these funds to your High-Yield account could
            generate an additional{' '}
            <span className="font-bold text-[#ffd84d] underline decoration-[#ffd84d]/40 underline-offset-2">
              $614.00
            </span>{' '}
            in compound growth over the next year.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-full bg-[#ffd84d] px-6 py-2.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-[#e8c63e]">
              Explore Subscriptions
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Dismiss Tip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SmartTipCard
