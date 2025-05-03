import { Plus } from "lucide-react"
import { Button, Card } from "../shared/ui"
import { AddPostDialog } from "../features/post/ui"
import { useOverlay } from "../shared/lib/overlay"
import { PostBoard } from "../widgets/ui/PostBoard"

const PostsManager = () => {
  const { open } = useOverlay()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => open(({ isOpen, close }) => <AddPostDialog isOpen={isOpen} close={close} />)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <PostBoard />
      </Card.Content>
    </Card>
  )
}

export default PostsManager
