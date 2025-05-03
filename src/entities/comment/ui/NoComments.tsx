import { Frown } from "lucide-react"

export const NoComments = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-y-2 py-5">
      <Frown className="w-16 h-16" />
      <p>댓글이 없습니다.</p>
    </div>
  )
}
