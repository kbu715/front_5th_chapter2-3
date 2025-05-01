import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { CommentItem } from "./CommentItem"
import { Comment } from "../../../entities/comment/model/types"

interface CommentListProps {
  comments: Comment[]
  postId: number
  searchQuery: string
  onAddComment: (postId: number) => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

export const CommentList = ({
  comments,
  postId,
  searchQuery,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: CommentListProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => onAddComment(postId)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment, index) => (
          <CommentItem
            key={`${comment.id}-${index}`}
            comment={comment}
            postId={postId}
            searchQuery={searchQuery}
            onLike={onLikeComment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        ))}
      </div>
    </div>
  )
}
