import { Skeleton } from '@/components/ui/skeleton'

const TransactionsSkeleton = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-9 w-56" />
        </div>
        <div className="flex gap-2 self-start">
          <Skeleton className="h-11 w-28 rounded-full" />
          <Skeleton className="h-11 w-40 rounded-full" />
        </div>
      </div>

      {/* Filters + Outflow */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-wrap gap-3">
          <Skeleton className="h-12 w-full rounded-2xl sm:w-64" />
          <Skeleton className="h-12 w-44 rounded-2xl" />
          <Skeleton className="h-12 w-36 rounded-2xl" />
        </div>
        <div className="rounded-[2rem] bg-white p-5 dark:bg-white/5 lg:w-64">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-8 w-32" />
          <Skeleton className="mt-2 h-3 w-40" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[2rem] bg-white p-2 sm:p-6 dark:bg-white/5">
        {/* Header row */}
        <div className="flex gap-6 border-b border-black/5 px-4 py-4 dark:border-white/5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-28 flex-1" />
          <Skeleton className="hidden h-3 w-20 sm:block" />
          <Skeleton className="hidden h-3 w-16 md:block" />
          <Skeleton className="h-3 w-16" />
        </div>
        {/* Rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-black/5 px-4 py-5 last:border-0 dark:border-white/5"
          >
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-1 items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1 h-3 w-24" />
              </div>
            </div>
            <Skeleton className="hidden h-6 w-24 rounded-lg sm:block" />
            <Skeleton className="hidden h-4 w-16 md:block" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-9 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TransactionsSkeleton
