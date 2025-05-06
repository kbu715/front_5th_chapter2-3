import { Button, Dialog, Input, Textarea } from "@shared/ui"
import { PostsResponse } from "@entities/post/model/types"
import { useForm } from "react-hook-form"
import { useAddPostMutation } from "@entities/post/model/hooks/mutations"
import { postQueryKeys } from "@entities/post/model/queryKeys"
import { useQueryClient } from "@tanstack/react-query"
import { usePostQueryParams } from "@features/post/model/hooks"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPostFormSchema } from "@features/post/model/schema"

type AddPostFormValues = z.infer<typeof addPostFormSchema>

interface AddPostDialogProps {
  defaultValues?: AddPostFormValues
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
    formState: { isSubmitting, errors },
  } = useForm<AddPostFormValues>({
    defaultValues,
    resolver: zodResolver(addPostFormSchema),
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
    },
    onSettled: () => {
      close()
    },
  })

  const onSubmit = (data: AddPostFormValues) => {
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
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          <Textarea id="body" rows={10} placeholder="내용" {...register("body", { required: true })} />
          {errors.body && <p className="text-sm text-red-500">{errors.body.message}</p>}
          <Input
            id="userId"
            type="number"
            placeholder="사용자 ID"
            {...register("userId", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
          <Button type="submit" disabled={isSubmitting || isPending}>
            게시물 추가
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
