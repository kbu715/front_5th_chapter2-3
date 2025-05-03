import Skeleton from "../../../shared/ui/Skeleton"

export const UserInfoSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center flex-col gap-2 w-full">
        <Skeleton className="w-[96px] h-[96px] rounded-[4px]" />
        <Skeleton className="w-[80px] h-[28px] rounded-[4px]" />
      </div>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> <Skeleton className="w-[100px] h-[20px] rounded-[4px]" />
        </p>
        <p>
          <strong>나이:</strong> <Skeleton className="w-[30px] h-[20px] rounded-[4px]" />
        </p>
        <p>
          <strong>이메일:</strong> <Skeleton className="w-[100px] h-[20px] rounded-[4px]" />
        </p>
        <p>
          <strong>전화번호:</strong> <Skeleton className="w-[150px] h-[20px] rounded-[4px]" />
        </p>
        <p>
          <strong>주소:</strong> <Skeleton className="w-[150px] h-[20px] rounded-[4px]" />
        </p>
        <p>
          <strong>직장:</strong> <Skeleton className="w-[200px] h-[20px] rounded-[4px]" />
        </p>
      </div>
    </div>
  )
}
