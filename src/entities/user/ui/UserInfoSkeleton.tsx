import { Skeleton, Card } from "@shared/ui"

export const UserInfoSkeleton = () => {
  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <Card.Header className="flex items-center justify-center pb-0">
        <div className="relative">
          <Skeleton className="w-28 h-28 rounded-full border-4 border-white shadow-lg" />
        </div>
        <Card.Title className="mt-4 text-2xl font-bold">
          <Skeleton className="w-32 h-8" />
        </Card.Title>
      </Card.Header>
      <Card.Content className="mt-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">이름:</span>
            <Skeleton className="w-40 h-5" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">나이:</span>
            <Skeleton className="w-10 h-5" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">이메일:</span>
            <Skeleton className="w-48 h-5" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">전화번호:</span>
            <Skeleton className="w-36 h-5" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">주소:</span>
            <Skeleton className="w-56 h-5" />
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            <span className="font-medium w-24 text-gray-600">직장:</span>
            <Skeleton className="w-48 h-5" />
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
