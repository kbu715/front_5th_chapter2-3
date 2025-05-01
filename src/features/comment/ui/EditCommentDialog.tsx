import { Dialog, Textarea, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

type CommentFormValues = Pick<Comment, "body">

interface EditCommentDialogProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  selectedComment: Comment | null
  onUpdateComment: (updatedComment: Comment) => void
}

export const EditCommentDialog = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  onUpdateComment,
}: EditCommentDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormValues>({
    defaultValues: {
      body: "",
    },
  })

  useEffect(() => {
    if (selectedComment) {
      reset({
        body: selectedComment.body,
      })
    }
  }, [selectedComment])

  const onSubmit = (data: CommentFormValues) => {
    if (!selectedComment) return

    onUpdateComment({
      ...selectedComment,
      ...data,
    })
  }

  return (
    <Dialog
      open={showEditCommentDialog}
      onOpenChange={(open) => {
        setShowEditCommentDialog(open)
        if (!open) reset()
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea placeholder="댓글 내용" {...register("body", { required: true })} />
          <Button type="submit" disabled={isSubmitting || !selectedComment}>
            댓글 업데이트
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
