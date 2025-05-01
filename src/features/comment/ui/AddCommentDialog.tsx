import { Button, Dialog, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"
import { useForm } from "react-hook-form"

type CommentFormValues = Pick<Comment, "body" | "userId">

interface AddCommentDialogProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  onAddComment: (data: Pick<Comment, "body" | "postId" | "userId">) => void
  postId: number | null
}

export const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  onAddComment,
  postId,
}: AddCommentDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormValues>({
    defaultValues: {
      body: "",
      userId: 1,
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    if (!postId) return
    onAddComment({
      ...data,
      postId,
    })
    reset()
  }

  return (
    <Dialog
      open={showAddCommentDialog}
      onOpenChange={(open) => {
        setShowAddCommentDialog(open)
        if (!open) reset()
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea placeholder="댓글 내용" {...register("body", { required: true })} />
          <Button type="submit" disabled={isSubmitting || !postId}>
            댓글 추가
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
