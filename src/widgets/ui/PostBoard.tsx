import { usePostQueryParams, usePostsIntersectionQuery } from "@features/post/model/hooks"
import { usePrefetchPostsQuery } from "@entities/post/model/hooks/queries"
import { useUsersQuery } from "@entities/user/model/hooks/queries"
import { PostController, PostPagination, PostTable, PostTableSkeleton } from "@features/post/ui"

export const PostBoard = () => {
  const { params, setters } = usePostQueryParams()
  const { search: searchQuery, tag: selectedTag, limit, skip } = params
  const { setTag: setSelectedTag } = setters

  const { posts, isLoading, total } = usePostsIntersectionQuery({ search: searchQuery, tag: selectedTag, limit, skip })

  const { data: users, isLoading: isUsersLoading } = useUsersQuery({
    select: (data) => data.users,
  })

  const loading = isLoading || isUsersLoading

  const postsWithUsers =
    posts.map((post) => ({
      ...post,
      author: users?.find((user) => user.id === post.userId),
    })) || []

  usePrefetchPostsQuery()

  return (
    <div className="flex flex-col gap-4">
      <PostController />
      {loading ? (
        <PostTableSkeleton />
      ) : (
        <PostTable
          posts={postsWithUsers}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      )}
      <PostPagination total={total || 0} />
    </div>
  )
}
