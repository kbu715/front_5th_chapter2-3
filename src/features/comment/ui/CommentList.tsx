import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { CommentItem } from "./CommentItem"
import { Comment } from "../../../entities/comment/model/types"
import { AddCommentDialog } from "./AddCommentDialog"
import { useOverlay } from "../../../shared/lib/overlay"
interface CommentListProps {
  comments: Comment[]
  postId: number
  searchQuery: string
}

export const CommentList = ({ comments, postId, searchQuery }: CommentListProps) => {
  const { open } = useOverlay()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() =>
            open(({ isOpen, close }) => <AddCommentDialog postId={postId} isOpen={isOpen} close={close} />)
          }
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment, index) => (
          <CommentItem key={`${comment.id}-${index}`} comment={comment} postId={postId} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  )
}
