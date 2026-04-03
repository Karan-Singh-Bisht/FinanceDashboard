import { Skeleton } from '@/components/ui/skeleton'

const DashboardSkeleton = () => {
  return (
    <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,320px)]">
      <div className="min-w-0 grid gap-6">
        <div className="min-w-0 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          {/* BalanceOverview skeleton */}
          <div className="rounded-[2rem] bg-[#2d3720] p-6 sm:p-10 dark:bg-[#1a1f14]">
            <Skeleton className="h-3 w-28 bg-white/10" />
            <Skeleton className="mt-2 h-5 w-44 bg-white/10" />
            <Skeleton className="mt-5 h-10 w-60 bg-white/10" />
            <Skeleton className="mt-3 h-6 w-40 rounded-full bg-white/10" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Skeleton className="h-11 w-40 rounded-full bg-white/10" />
              <Skeleton className="h-11 w-36 rounded-full bg-white/10" />
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <Skeleton className="h-3 w-24 bg-white/10" />
                <Skeleton className="mt-2 h-6 w-28 bg-white/10" />
              </div>
              <div>
                <Skeleton className="h-3 w-24 bg-white/10" />
                <Skeleton className="mt-2 h-6 w-28 bg-white/10" />
              </div>
            </div>
          </div>

          {/* StatCards skeleton */}
          <div className="min-w-0 grid gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-[1.5rem] bg-white p-5 sm:p-6 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="mt-4 h-8 w-40" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* BalanceTrendChart skeleton */}
        <div className="rounded-[2rem] bg-white p-5 sm:p-8 dark:bg-white/5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="mt-1 h-4 w-52" />
          <Skeleton className="mt-6 h-52 w-full sm:h-64 md:h-84" />
        </div>
      </div>

      {/* AdminPanel / SpendingPieChart column skeleton */}
      <div className="min-w-0 space-y-6">
        <div className="rounded-[1.5rem] bg-white p-4 sm:p-6 dark:bg-white/5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="mt-1 h-4 w-20" />
          <Skeleton className="mx-auto mt-4 h-48 w-48 rounded-full" />
          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardSkeleton
