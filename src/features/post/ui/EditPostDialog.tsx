import { Post, PostsResponse } from "../../../entities/post/model/types"
import { Dialog, Textarea, Input, Button } from "../../../shared/ui"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdatePostMutation } from "../../../entities/post/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/model/queryKeys"
import { usePostQueryParams } from "../model/hooks"

type PostFormValues = Pick<Post, "title" | "body">

interface EditPostDialogProps {
  showEditDialog: boolean
  setShowEditDialog: (showEditDialog: boolean) => void
  selectedPost: Post | null
}

export const EditPostDialog = ({ showEditDialog, setShowEditDialog, selectedPost }: EditPostDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      body: "",
    },
  })

  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params

  const { mutate: updatePost } = useUpdatePostMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(postQueryKeys.list({ limit, skip }), (old: PostsResponse) => {
        if (!old) return undefined

        return {
          ...old,
          posts: old.posts.map((post) => (post.id === data.id ? data : post)),
        }
      })

      setShowEditDialog(false)
    },
  })

  useEffect(() => {
    if (selectedPost) {
      reset({
        title: selectedPost.title,
        body: selectedPost.body,
      })
    }
  }, [selectedPost])

  const onSubmit = (data: PostFormValues) => {
    if (!selectedPost) return

    updatePost({
      ...selectedPost,
      ...data,
    })
  }

  return (
    <Dialog
      open={showEditDialog}
      onOpenChange={(open) => {
        setShowEditDialog(open)
        if (!open) reset()
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="제목" {...register("title", { required: true })} />
          <Textarea rows={15} placeholder="내용" {...register("body", { required: true })} />
          <Button type="submit" disabled={isSubmitting || !selectedPost}>
            게시물 업데이트
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
