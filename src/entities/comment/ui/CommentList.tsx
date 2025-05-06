import { CommentItem } from "@features/comment/ui"
import { Comment } from "@entities/comment/model/types"

interface CommentListProps {
  comments: Comment[]
  postId: number
  searchQuery: string
}

export const CommentList = ({ comments, postId, searchQuery }: CommentListProps) => {
  return (
    <div className="space-y-1">
      {comments.map((comment, index) => (
        <CommentItem key={`${comment.id}-${index}`} comment={comment} postId={postId} searchQuery={searchQuery} />
      ))}
    </div>
  )
}
