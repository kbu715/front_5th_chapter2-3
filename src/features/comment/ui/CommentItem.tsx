import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { HighlightedText, Button } from "@shared/ui"
import { Comment } from "@entities/comment/model/types"
import { useUpdateCommentLikesMutation } from "@entities/comment/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { commentQueryKeys } from "@entities/comment/model/queryKeys"
import { EditCommentDialog } from "./EditCommentDialog"
import { DeleteCommentDialog } from "./DeleteCommentDialog"
import { useOverlay } from "@shared/lib"

interface CommentItemProps {
  comment: Comment
  postId: number
  searchQuery: string
}

export const CommentItem = ({ comment, postId, searchQuery }: CommentItemProps) => {
  const queryClient = useQueryClient()
  const { open } = useOverlay()

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

    // 댓글 좋아요 업데이트 후 댓글 목록 갱신 (실제 서버 데이터와 동기화 할 때는 여기까지 해줘야 함)
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
      <div className="overflow-hidden max-w-[50%]">
        <span className="truncate">
          {comment.user?.username}: <HighlightedText text={comment.body} highlight={searchQuery} />
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            open(({ isOpen, close }) => (
              <DeleteCommentDialog comment={comment} postId={postId} isOpen={isOpen} close={close} />
            ))
          }
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
