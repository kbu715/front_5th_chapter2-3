import { Frown } from "lucide-react"

export const NoPost = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-y-2 py-10">
      <Frown className="w-16 h-16" />
      <p>게시물이 없습니다.</p>
    </div>
  )
}
