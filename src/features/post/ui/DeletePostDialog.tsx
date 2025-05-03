import { Dialog, Button } from "../../../shared/ui"
import { useQueryClient } from "@tanstack/react-query"
import { usePostQueryParams } from "../../../features/post/model/hooks"
import { PostsResponse } from "../../../entities/post/model/types"
import { Post } from "../../../entities/post/model/types"
import { useDeletePostMutation } from "../../../entities/post/model/hooks/mutations"
import { postQueryKeys } from "../../../entities/post/model/queryKeys"
import { useCallback } from "react"

interface DeletePostDialogProps {
  post: Post
  isOpen: boolean
  close: () => void
}

export const DeletePostDialog = ({ post, isOpen, close }: DeletePostDialogProps) => {
  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params
  const { mutate: deletePost, isPending } = useDeletePostMutation({
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(postQueryKeys.list({ limit, skip }), (old: PostsResponse) => {
        if (!old) return undefined
        return {
          ...old,
          posts: old.posts.filter((post) => post.id !== deletedId),
          total: old.total - 1,
        }
      })
    },
    onSettled: () => {
      close()
    },
  })

  const handleDelete = useCallback(() => {
    if (post) {
      deletePost(post.id)
    }
  }, [deletePost, post])

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
          <Dialog.Title>게시물을 삭제하시겠습니까?</Dialog.Title>
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
