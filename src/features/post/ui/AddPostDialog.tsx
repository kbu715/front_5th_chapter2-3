import { Button, Dialog, Input, Textarea } from "../../../shared/ui"
import { Post, PostsResponse } from "../../../entities/post/model/types"
import { useForm } from "react-hook-form"
import { useAddPostMutation } from "../../../entities/post/model/hooks/mutations"
import { postQueryKeys } from "../../../entities/post/model/queryKeys"
import { useQueryClient } from "@tanstack/react-query"
import { usePostQueryParams } from "../model/hooks"

type PostFormValues = Pick<Post, "title" | "body" | "userId">

interface AddPostDialogProps {
  defaultValues?: PostFormValues
  isOpen: boolean
  close: () => void
}

export const AddPostDialog = ({
  defaultValues = { title: "", body: "", userId: 1 },
  isOpen,
  close,
}: AddPostDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<PostFormValues>({
    defaultValues,
  })

  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params
  const { mutate: addPost, isPending } = useAddPostMutation({
    onSuccess: (newPost) => {
      queryClient.setQueryData(postQueryKeys.list({ limit, skip }), (old: PostsResponse) => {
        if (!old) {
          return { posts: [newPost], total: 1 }
        }
        return {
          ...old,
          posts: [newPost, ...old.posts],
          total: old.total + 1,
        }
      })
      close()
    },
  })

  const onSubmit = (data: PostFormValues) => {
    addPost(data)
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

          <Button type="submit" disabled={isSubmitting || isPending || !isValid}>
            게시물 추가
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
