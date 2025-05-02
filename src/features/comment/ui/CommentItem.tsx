import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { HighlightedText, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"
import {
  useDeleteCommentMutation,
  useUpdateCommentLikesMutation,
} from "../../../entities/comment/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { commentQueryKeys } from "../../../entities/comment/model/queryKeys"
import { useOverlay } from "../../../shared/lib/overlay"
import { EditCommentDialog } from "./EditCommentDialog"

interface CommentItemProps {
  comment: Comment
  postId: number
  searchQuery: string
}

export const CommentItem = ({ comment, postId, searchQuery }: CommentItemProps) => {
  const queryClient = useQueryClient()
  const { open } = useOverlay()

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteCommentMutation({
    onSuccess: () => {
      queryClient.setQueryData(commentQueryKeys.byPost(postId), (old: Comment[]) =>
        old.filter((c) => c.id !== comment.id),
      )
    },
  })

  const { mutate: updateCommentLikes, isPending: isUpdatingLikes } = useUpdateCommentLikesMutation({
    // optimistic update 적용
    onMutate: async ({ id, likes }) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKeys.byPost(postId) })

      const previousComments = queryClient.getQueryData<Comment[]>(commentQueryKeys.byPost(postId)) || []

      queryClient.setQueryData(commentQueryKeys.byPost(postId), (old: Comment[]) =>
        old.map((comment) => (comment.id === id ? { ...comment, likes } : comment)),
      )

      return { previousComments }
    },

    onError: (_, __, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentQueryKeys.byPost(postId), context.previousComments)
      }
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: commentQueryKeys.byPost(postId) })
    // },
  })

  const handleLike = () => {
    const newLikes = comment.likes + 1
    updateCommentLikes({ id: comment.id, likes: newLikes })
  }

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user?.username}:</span>
        <span className="truncate">
          <HighlightedText text={comment.body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLike} disabled={isUpdatingLikes}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            open(({ isOpen, close }) => <EditCommentDialog comment={comment} isOpen={isOpen} close={close} />)
          }
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)} disabled={isDeleting}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
