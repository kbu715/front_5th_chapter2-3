import { Button, Dialog, HighlightedText } from "@shared/ui"
import { usePostQueryParams } from "@features/post/model/hooks"
import { Post } from "@entities/post/model/types"
import { useCommentsQuery } from "@entities/comment/model/hooks/queries"
import { Plus } from "lucide-react"
import { AddCommentDialog } from "@features/comment/ui/AddCommentDialog"
import { CommentList, CommentListSkeleton, NoComments } from "@entities/comment/ui"
import { useOverlay } from "@shared/lib"

interface PostDetailModalProps {
  post: Post
  isOpen: boolean
  close: () => void
}

export const PostDetailModal = ({ post, isOpen, close }: PostDetailModalProps) => {
  const { params } = usePostQueryParams()
  const { search: searchQuery } = params
  const { open } = useOverlay()
  const { data: comments, isLoading } = useCommentsQuery(post.id)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <Dialog.Content className="">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightedText text={post?.title || ""} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightedText text={post?.body || ""} highlight={searchQuery} />
          </p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <Button
                size="sm"
                onClick={() =>
                  open(({ isOpen, close }) => <AddCommentDialog postId={post.id} isOpen={isOpen} close={close} />)
                }
              >
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            {isLoading ? (
              <CommentListSkeleton />
            ) : comments && comments.length > 0 ? (
              <CommentList comments={comments} postId={post.id} searchQuery={searchQuery} />
            ) : (
              <NoComments />
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
