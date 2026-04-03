import { Skeleton } from '@/components/ui/skeleton'

const InsightsSkeleton = () => {
  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-52" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      {/* Top grid — allocation + chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-5 sm:p-8 dark:bg-white/5">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-6 h-10 w-28" />
          <Skeleton className="mt-2 h-4 w-44" />
          <Skeleton className="mt-6 h-16 w-full rounded-xl" />
          <Skeleton className="mt-6 h-5 w-20" />
          <Skeleton className="mt-2 h-2 w-full rounded-full" />
        </div>
        <div className="rounded-[2rem] bg-white p-5 sm:p-8 dark:bg-white/5">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-1 h-4 w-56" />
          <Skeleton className="mt-6 h-48 w-full" />
        </div>
      </div>

      {/* Smart tip */}
      <div className="rounded-[2rem] bg-white p-5 sm:p-8 dark:bg-white/5">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="h-28 w-28 shrink-0 rounded-xl sm:h-40 sm:w-40" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="mt-4 h-7 w-64" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-3/4" />
            <div className="mt-5 flex gap-3">
              <Skeleton className="h-11 w-40 rounded-full" />
              <Skeleton className="h-11 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[2rem] bg-white p-5 sm:p-6 dark:bg-white/5">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="mt-5 h-10 w-24" />
            <Skeleton className="mt-2 h-4 w-44" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default InsightsSkeleton
