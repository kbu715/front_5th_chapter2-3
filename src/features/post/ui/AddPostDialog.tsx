import { Button, Dialog, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/types"
import { useForm } from "react-hook-form"

type PostFormValues = Pick<Post, "title" | "body" | "userId">

interface AddPostDialogProps {
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
  onAddPost: (data: PostFormValues) => void
  defaultValues?: PostFormValues
}

export const AddPostDialog = ({
  showAddDialog,
  setShowAddDialog,
  onAddPost,
  defaultValues = { title: "", body: "", userId: 1 },
}: AddPostDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues,
  })

  const onSubmit = (data: PostFormValues) => {
    onAddPost(data)
    reset()
  }

  return (
    <Dialog
      open={showAddDialog}
      onOpenChange={(open) => {
        setShowAddDialog(open)
        if (!open) reset()
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input id="title" placeholder="제목" {...register("title", { required: true })} />
          <Textarea id="body" rows={10} placeholder="내용" {...register("body", { required: true })} />
          <Input
            id="userId"
            type="number"
            placeholder="사용자 ID"
            {...register("userId", {
              required: true,
              valueAsNumber: true,
            })}
          />

          <Button type="submit" disabled={isSubmitting}>
            게시물 추가
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
