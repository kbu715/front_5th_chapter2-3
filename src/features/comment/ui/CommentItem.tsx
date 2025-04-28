import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { HighlightedText, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"

interface CommentItemProps {
  comment: Comment
  postId: number
  searchQuery: string
  onLike: (commentId: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (commentId: number, postId: number) => void
}

export const CommentItem = ({ comment, postId, searchQuery, onLike, onEdit, onDelete }: CommentItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user?.username}:</span>
        <span className="truncate">
          <HighlightedText text={comment.body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => onLike(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
