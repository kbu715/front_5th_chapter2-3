import { Skeleton } from "@shared/ui"

export const CommentListSkeleton = () => {
  return (
    <div className="space-y-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex items-center justify-between pb-1" key={index}>
          <Skeleton className="w-[212px] h-[20px] rounded-[4px]" />

          <div className="flex items-center gap-1">
            <span className="px-3">
              <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
            </span>
            <span className="px-3">
              <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
            </span>
            <span className="px-3">
              <Skeleton className="w-[16px] h-[16px] rounded-[4px]" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
