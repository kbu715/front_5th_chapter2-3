import { Dialog, HighlightedText } from "../../../shared/ui"
import { CommentList } from "../../comment/ui/CommentList"
import { usePostQueryParams } from "../model/hooks"
import { Post } from "../../../entities/post/model/types"
import { useCommentsQuery } from "../../../entities/comment/model/hooks/queries"

interface PostDetailModalProps {
  post: Post
  isOpen: boolean
  close: () => void
}

export const PostDetailModal = ({ post, isOpen, close }: PostDetailModalProps) => {
  const { params } = usePostQueryParams()
  const { search: searchQuery } = params

  const { data: comments } = useCommentsQuery(post.id)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightedText text={post?.title || ""} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightedText text={post?.body || ""} highlight={searchQuery} />
          </p>
          {post?.id && comments && comments.length > 0 && (
            <CommentList comments={comments} postId={post.id} searchQuery={searchQuery} />
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
