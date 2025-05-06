import { Dialog, Button } from "@shared/ui"
import { useQueryClient } from "@tanstack/react-query"
import { Comment } from "@entities/comment/model/types"
import { useDeleteCommentMutation } from "@entities/comment/model/hooks/mutations"
import { commentQueryKeys } from "@entities/comment/model/queryKeys"
import { useCallback } from "react"

interface DeleteCommentDialogProps {
  comment: Comment
  postId: number
  isOpen: boolean
  close: () => void
}

export const DeleteCommentDialog = ({ comment, postId, isOpen, close }: DeleteCommentDialogProps) => {
  const queryClient = useQueryClient()

  const { mutate: deleteComment, isPending } = useDeleteCommentMutation({
    onSuccess: () => {
      queryClient.setQueryData(commentQueryKeys.byPost(postId), (old: Comment[]) =>
        old.filter((c) => c.id !== comment.id),
      )
    },
    onSettled: () => {
      close()
    },
  })

  const handleDelete = useCallback(() => {
    if (comment) {
      deleteComment(comment.id)
    }
  }, [deleteComment, comment])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글을 삭제하시겠습니까?</Dialog.Title>
        </Dialog.Header>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={close} disabled={isPending}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            삭제
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
