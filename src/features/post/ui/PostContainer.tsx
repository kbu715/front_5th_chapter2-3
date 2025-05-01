import { Post, Tag } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { usePostQueryParams } from "../model/hooks"
import PostController from "./PostController"
import PostPagination from "./PostPagination"
import { PostTable } from "./PostTable"

interface PostContainerProps {
  posts: Post[]
  tags: Tag[]
  total: number
  loading: boolean
  handleSearchPosts: () => void
  handleDeletePost: (postId: number) => void
  openPostEditDialog: (post: Post) => void
  openPostDetail: (post: Post) => void
  openUserModal: (user: User | undefined) => void
}

const PostContainer = ({
  tags,
  handleSearchPosts,
  total,
  loading,
  posts,
  handleDeletePost,
  openPostEditDialog,
  openPostDetail,
  openUserModal,
}: PostContainerProps) => {
  const { params, setters } = usePostQueryParams()
  const { search: searchQuery, tag: selectedTag } = params
  const { setTag: setSelectedTag } = setters

  return (
    <div className="flex flex-col gap-4">
      <PostController tags={tags} handleSearchPosts={handleSearchPosts} />
      {loading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <PostTable
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          onDeletePost={handleDeletePost}
          onEditPost={openPostEditDialog}
          onOpenPostDetail={openPostDetail}
          onOpenUserModal={openUserModal}
        />
      )}
      <PostPagination total={total} />
    </div>
  )
}

export default PostContainer
