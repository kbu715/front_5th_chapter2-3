import { MessageSquare, Edit2, Trash2, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button, Table, HighlightedText } from "../../../shared/ui"
import { Post, PostsResponse } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { useDeletePostMutation } from "../../../entities/post/model/hooks/mutations"
import { useQueryClient } from "@tanstack/react-query"
import { usePostQueryParams } from "../model/hooks"
import { postQueryKeys } from "../../../entities/post/model/queryKeys"

type PostWithAuthor = Post & { author?: User }

interface PostTableProps {
  posts: PostWithAuthor[]
  searchQuery: string
  selectedTag: string
  onSelectTag: (tag: string) => void
  onEditPost: (post: PostWithAuthor) => void
  onOpenPostDetail: (post: PostWithAuthor) => void
  onOpenUserModal: (user: User | undefined) => void
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onSelectTag,
  onEditPost,
  onOpenPostDetail,
  onOpenUserModal,
}: PostTableProps) => {
  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params
  const { mutate: deletePost } = useDeletePostMutation({
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
  })

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[50px]">ID</Table.Head>
          <Table.Head>제목</Table.Head>
          <Table.Head className="w-[150px]">작성자</Table.Head>
          <Table.Head className="w-[150px]">반응</Table.Head>
          <Table.Head className="w-[150px]">작업</Table.Head>
        </Table.Row>
      </Table.Header>
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
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpenUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
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
                <Button variant="ghost" size="sm" onClick={() => onOpenPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditPost(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
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
