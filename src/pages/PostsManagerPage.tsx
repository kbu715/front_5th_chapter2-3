import { Plus } from "lucide-react"
import { Button, Card, LoadingDots } from "../shared/ui"
import { AddPostDialog } from "../features/post/ui"
import { useOverlay } from "../shared/lib/overlay"
import { PostBoard } from "../widgets/ui/PostBoard"
import { useIsMutating } from "@tanstack/react-query"

const PostsManager = () => {
  const { open } = useOverlay()
  const isMutating = useIsMutating()

  return (
    <>
      {isMutating > 0 && <LoadingDots />}
      <Card className="w-full max-w-6xl mx-auto">
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <Button
              className="animated-background bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-700"
              onClick={() => open(({ isOpen, close }) => <AddPostDialog isOpen={isOpen} close={close} />)}
            >
              <Plus className="w-4 h-4 mr-2" />
              게시물 추가
            </Button>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <PostBoard />
        </Card.Content>
      </Card>
    </>
  )
}

export default PostsManager
