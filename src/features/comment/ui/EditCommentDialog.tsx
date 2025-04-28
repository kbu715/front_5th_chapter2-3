import { Dialog, Textarea, Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"

interface EditCommentDialogProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  handleUpdateComment: () => void
}

export const EditCommentDialog = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  handleUpdateComment,
}: EditCommentDialogProps) => {
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
