import { MessageSquare, Edit2, Trash2, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button, Table, HighlightedText } from "@shared/ui"
import { Post } from "@entities/post/model/types"
import { User } from "@entities/user/model/types"
import { UserModal } from "@entities/user/ui"
import { EditPostDialog } from "./EditPostDialog"
import { PostDetailModal } from "./PostDetailModal"
import { PostTableHeader } from "./PostTableHeader"
import { DeletePostDialog } from "./DeletePostDialog"
import { NoPost } from "@entities/post/ui"
import { useOverlay } from "@shared/lib"

type PostWithAuthor = Post & { author?: User }

interface PostTableProps {
  posts: PostWithAuthor[]
  searchQuery: string
  selectedTag: string
  onSelectTag: (tag: string) => void
}

export const PostTable = ({ posts, searchQuery, selectedTag, onSelectTag }: PostTableProps) => {
  const { open } = useOverlay()

  if (posts.length === 0) {
    return <NoPost />
  }

  return (
    <Table>
      <PostTableHeader />
      <Table.Body>
        {posts.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>{post.id}</Table.Cell>
            <Table.Cell>
              <div className="space-y-1">
                <div>
                  <HighlightedText text={post.title} highlight={searchQuery} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => onSelectTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  if (!post.author?.id) return
                  open(({ isOpen, close }) => {
                    return <UserModal userId={post.author?.id!} isOpen={isOpen} close={close} />
                  })
                }}
              >
                <img
                  src={post.author?.image}
                  alt={post.author?.username}
                  className="w-8 h-8 rounded-full hover:bg-gray-100"
                />
                <span className="hover:bg-gray-100">{post.author?.username}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    open(({ isOpen, close }) => <PostDetailModal post={post} isOpen={isOpen} close={close} />)
                  }
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    open(({ isOpen, close }) => <EditPostDialog post={post} isOpen={isOpen} close={close} />)
                  }
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    open(({ isOpen, close }) => <DeletePostDialog post={post} isOpen={isOpen} close={close} />)
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
