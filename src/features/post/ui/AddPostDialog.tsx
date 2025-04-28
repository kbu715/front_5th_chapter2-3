import { Input, Textarea, Button, Dialog } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/types"

interface AddPostDialogProps {
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
  newPost: Pick<Post, "title" | "body" | "userId">
  setNewPost: (newPost: Pick<Post, "title" | "body" | "userId">) => void
  onAddPost: () => void
}

export const AddPostDialog = ({
  showAddDialog,
  setShowAddDialog,
  newPost,
  setNewPost,
  onAddPost,
}: AddPostDialogProps) => {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={onAddPost}>게시물 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
