import { Button, Dialog, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"
import { useForm } from "react-hook-form"
import { useAddCommentMutation } from "../../../entities/comment/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { commentQueryKeys } from "../../../entities/comment/model/queryKeys"

type CommentFormValues = Pick<Comment, "body" | "userId">

interface AddCommentDialogProps {
  postId: number
  isOpen: boolean
  close: () => void
}

export const AddCommentDialog = ({ postId, isOpen, close }: AddCommentDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<CommentFormValues>({
    defaultValues: {
      body: "",
      userId: 1,
    },
  })

  const queryClient = useQueryClient()

  const { mutate: addComment } = useAddCommentMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(commentQueryKeys.byPost(postId), (old: Comment[]) => {
        return [...old, { ...data, likes: 0 }]
      })
      close()
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    if (!postId) return
    addComment({
      ...data,
      postId,
    })
    reset()
  }

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
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea placeholder="댓글 내용" {...register("body", { required: true })} />
          <Button type="submit" disabled={isSubmitting || !postId || !isValid}>
            댓글 추가
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
