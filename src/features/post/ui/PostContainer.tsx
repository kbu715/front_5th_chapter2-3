import { usePostsIntersectionQuery } from "../../../entities/post/model/hooks/queries"
import { Post } from "../../../entities/post/model/types"
import { useUsersQuery } from "../../../entities/user/model/hooks/queries"
import { User } from "../../../entities/user/model/types"
import { usePostQueryParams } from "../model/hooks"
import PostController from "./PostController"
import PostPagination from "./PostPagination"
import { PostTable } from "./PostTable"

interface PostContainerProps {
  openPostEditDialog: (post: Post) => void
  openPostDetail: (post: Post) => void
  openUserModal: (user: User | undefined) => void
}

const PostContainer = ({ openPostEditDialog, openPostDetail, openUserModal }: PostContainerProps) => {
  const { params, setters } = usePostQueryParams()
  const { search: searchQuery, tag: selectedTag, limit, skip } = params
  const { setTag: setSelectedTag } = setters

  const { posts, isLoading } = usePostsIntersectionQuery({ search: searchQuery, tag: selectedTag, limit, skip })

  const { data: users, isLoading: isUsersLoading } = useUsersQuery({
    select: (data) => data.users,
  })

  const loading = isLoading || isUsersLoading

  const postsWithUsers =
    posts.map((post) => ({
      ...post,
      author: users?.find((user) => user.id === post.userId),
    })) || []

  return (
    <div className="flex flex-col gap-4">
      <PostController />
      {loading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <PostTable
          posts={postsWithUsers}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          onEditPost={openPostEditDialog}
          onOpenPostDetail={openPostDetail}
          onOpenUserModal={openUserModal}
        />
      )}
      <PostPagination total={posts.length || 0} />
    </div>
  )
}

export default PostContainer
