import { Dialog, Textarea, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdateCommentMutation } from "../../../entities/comment/model/hooks/mutations/useUpdateCommentMutation"
import { useQueryClient } from "@tanstack/react-query"
import { commentQueryKeys } from "../../../entities/comment/model/queryKeys"

type CommentFormValues = Pick<Comment, "body">

interface EditCommentDialogProps {
  comment: Comment
  isOpen: boolean
  close: () => void
}

export const EditCommentDialog = ({ comment, isOpen, close }: EditCommentDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<CommentFormValues>({
    defaultValues: {
      body: "",
    },
  })
  const queryClient = useQueryClient()

  const { mutate: updateComment, isPending } = useUpdateCommentMutation({
    onSuccess: (data) => {
      if (!comment.postId) return

      queryClient.setQueryData(commentQueryKeys.byPost(comment.postId), (old: Comment[]) =>
        old.map((c) => (c.id === comment.id ? data : c)),
      )
    },
    onSettled: () => {
      close()
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    updateComment({
      ...comment,
      ...data,
    })
  }

  useEffect(() => {
    if (comment) {
      reset({
        body: comment.body,
      })
    }
  }, [comment])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset()
          close()
        }
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea placeholder="댓글 내용" {...register("body", { required: true })} />
          <Button type="submit" disabled={isSubmitting || isPending || !isValid}>
            댓글 업데이트
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
