import { Button, Dialog, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"

interface AddCommentDialogProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  newComment: Pick<Comment, "body" | "postId" | "userId">
  setNewComment: (newComment: Pick<Comment, "body" | "postId" | "userId">) => void
  onAddComment: () => void
}

export const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  onAddComment,
}: AddCommentDialogProps) => {
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={onAddComment}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
