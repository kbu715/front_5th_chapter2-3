import { Post } from "../../../entities/post/model/types"
import { Dialog, Textarea, Input, Button } from "../../../shared/ui"

interface EditPostDialogProps {
  showEditDialog: boolean
  setShowEditDialog: (showEditDialog: boolean) => void
  selectedPost: Post | null
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  onUpdatePost: () => void
}

export const EditPostDialog = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  onUpdatePost,
}: EditPostDialogProps) => {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          />
          <Button onClick={onUpdatePost}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
