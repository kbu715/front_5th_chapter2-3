import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Pagination, Button, Card, Dialog, HighlightedText } from "../shared/ui"
import { UserModal } from "../features/user/ui"
import {
  AddPostDialog,
  EditPostDialog,
  PostSearchInput,
  PostSortBySelect,
  PostSortSelect,
  PostTable,
  PostTagFilter,
} from "../features/post/ui"
import { AddCommentDialog, CommentList, EditCommentDialog } from "../features/comment/ui"
import { Post, Tag } from "../entities/post/model/types"
import { User } from "../entities/user/model/types"
import { Comment } from "../entities/comment/model/types"
import {
  addPost,
  deletePost,
  fetchPosts,
  searchPosts,
  updatePost,
  fetchPostTags,
  fetchPostsByTag,
} from "../entities/post/api"
import { fetchUserById, fetchUsers } from "../entities/user/api"
import { deleteComment, updateCommentLikes, updateComment, addComment, fetchComments } from "../entities/comment/api"

type PostWithAuthor = Post & { author?: User }

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [total, setTotal] = useState<number>(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")

  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<Tag["slug"]>(queryParams.get("tag") || "")
  const [comments, setComments] = useState<{ [key: Post["id"]]: Comment[] }>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<Pick<Comment, "body" | "postId" | "userId">>({
    body: "",
    postId: null,
    userId: 1,
  })

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const handleFetchPosts = async () => {
    setLoading(true)
    try {
      const { posts, total } = await fetchPosts({ limit, skip })
      const { users } = await fetchUsers()

      const postsWithUsers = posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(total)
    } catch (error) {
      console.error("게시물 불러오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그 가져오기
  const handleFetchTags = async () => {
    try {
      const tags = await fetchPostTags()

      setTags(tags)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const handleSearchPosts = async () => {
    if (!searchQuery) {
      handleFetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await searchPosts(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const handleFetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      handleFetchPosts()
      return
    }

    setLoading(true)

    try {
      const { posts, total } = await fetchPostsByTag(tag)
      const { users } = await fetchUsers()

      const postsWithUsers = posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const handleAddPost = async () => {
    try {
      const data = await addPost(newPost)

      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    try {
      if (!selectedPost) return

      const data = await updatePost(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const handleFetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const comments = await fetchComments(postId)
      setComments((prev) => ({ ...prev, [postId]: comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const handleAddComment = async () => {
    try {
      const data = await addComment(newComment)

      setComments((prev) => ({
        ...prev,
        ...(data.postId ? { [data.postId]: [...(prev[data.postId] || []), data] } : {}),
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    try {
      if (!selectedComment) return

      const data = await updateComment({ id: selectedComment.id, body: selectedComment.body })

      setComments((prev) => ({
        ...prev,
        ...(data.postId
          ? { [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)) }
          : {}),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const handleLikeComment = async (id: number, postId: number) => {
    try {
      const data = await updateCommentLikes({ id, likes: comments[postId].find((c) => c.id === id)?.likes || 0 + 1 })

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    handleFetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    if (!user) return

    try {
      const userData = await fetchUserById(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    handleFetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag)
    } else {
      handleFetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <PostSearchInput value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearchPosts} />
            <PostTagFilter
              selectedTag={selectedTag}
              onSelectTag={(tag) => {
                setSelectedTag(tag)
                handleFetchPostsByTag(tag)
                updateURL()
              }}
              tags={tags}
            />
            <PostSortBySelect value={sortBy} onChange={setSortBy} />
            <PostSortSelect value={sortOrder} onChange={setSortOrder} />
          </div>

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onSelectTag={(tag) => {
                setSelectedTag(tag)
                updateURL()
              }}
              onDeletePost={handleDeletePost}
              onEditPost={(post) => {
                setSelectedPost(post)
                setShowEditDialog(true)
              }}
              onOpenPostDetail={openPostDetail}
              onOpenUserModal={openUserModal}
            />
          )}

          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onLimitChange={(newLimit) => setLimit(newLimit)}
            onPageChange={(newSkip) => setSkip(newSkip)}
          />
        </div>
      </Card.Content>

      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        onAddPost={handleAddPost}
      />

      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        onUpdatePost={handleUpdatePost}
      />

      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        onAddComment={handleAddComment}
      />

      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        handleUpdateComment={handleUpdateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <Dialog.Content className="max-w-3xl">
          <Dialog.Header>
            <Dialog.Title>
              <HighlightedText text={selectedPost?.title || ""} highlight={searchQuery} />
            </Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <p>
              <HighlightedText text={selectedPost?.body || ""} highlight={searchQuery} />
            </p>
            {selectedPost?.id && (
              <CommentList
                comments={comments[selectedPost.id] || []}
                postId={selectedPost.id}
                searchQuery={searchQuery}
                onAddComment={(postId) => {
                  setNewComment((prev) => ({ ...prev, postId }))
                  setShowAddCommentDialog(true)
                }}
                onLikeComment={handleLikeComment}
                onEditComment={(comment) => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
                onDeleteComment={handleDeleteComment}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog>

      <UserModal open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />
    </Card>
  )
}

export default PostsManager
