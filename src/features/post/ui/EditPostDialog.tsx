import { Post, PostsResponse } from "@entities/post/model/types"
import { Dialog, Textarea, Input, Button } from "@shared/ui"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdatePostMutation } from "@entities/post/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { postQueryKeys } from "@entities/post/model/queryKeys"
import { usePostQueryParams } from "@features/post/model/hooks"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { editPostFormSchema } from "@features/post/model/schema"

type EditPostFormValues = z.infer<typeof editPostFormSchema>
interface EditPostDialogProps {
  post: Post | null
  isOpen: boolean
  close: () => void
}

export const EditPostDialog = ({ post, isOpen, close }: EditPostDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditPostFormValues>({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(editPostFormSchema),
  })

  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params

  const { mutate: updatePost, isPending } = useUpdatePostMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(postQueryKeys.list({ limit, skip }), (old: PostsResponse) => {
        if (!old) return undefined

        return {
          ...old,
          posts: old.posts.map((post) => (post.id === data.id ? data : post)),
        }
      })
    },
    onSettled: () => {
      close()
    },
  })

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
      })
    }
  }, [post])

  const onSubmit = (data: EditPostFormValues) => {
    if (!post) return

    updatePost({
      ...post,
      ...data,
    })
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
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="제목" {...register("title", { required: true })} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          <Textarea rows={15} placeholder="내용" {...register("body", { required: true })} />
          {errors.body && <p className="text-sm text-red-500">{errors.body.message}</p>}
          <Button type="submit" disabled={isSubmitting || isPending}>
            게시물 업데이트
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}
