import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, Dialog, HighlightedText } from "../shared/ui"
import { UserModal } from "../features/user/ui"
import { AddPostDialog, EditPostDialog } from "../features/post/ui"
import { AddCommentDialog, CommentList, EditCommentDialog } from "../features/comment/ui"
import { Post } from "../entities/post/model/types"
import { User } from "../entities/user/model/types"
import { Comment } from "../entities/comment/model/types"
import { fetchUserById } from "../entities/user/api"
import { deleteComment, updateCommentLikes, updateComment, addComment, fetchComments } from "../entities/comment/api"
import { usePostQueryParams } from "../features/post/model/hooks"
import PostContainer from "../features/post/ui/PostContainer"

const PostsManager = () => {
  const { params } = usePostQueryParams()
  const { search: searchQuery } = params

  const [comments, setComments] = useState<{ [key: Post["id"]]: Comment[] }>({})

  // 클라이언트 상태 관리
  const [commentPostId, setCommentPostId] = useState<number | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

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
  const handleAddComment = async (formData: Pick<Comment, "body" | "postId" | "userId">) => {
    try {
      const data = await addComment(formData)

      setComments((prev) => ({
        ...prev,
        ...(data.postId ? { [data.postId]: [...(prev[data.postId] || []), data] } : {}),
      }))
      setShowAddCommentDialog(false)
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const handleUpdateComment = async (updatedComment: Comment) => {
    try {
      const data = await updateComment({
        id: updatedComment.id,
        body: updatedComment.body,
      })

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

  const openPostEditDialog = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
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

  const openAddCommentDialog = (postId: number) => {
    setCommentPostId(postId)
    setShowAddCommentDialog(true)
  }

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
        <PostContainer
          openPostEditDialog={openPostEditDialog}
          openPostDetail={openPostDetail}
          openUserModal={openUserModal}
        />
      </Card.Content>

      <AddPostDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} />

      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
      />

      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        onAddComment={handleAddComment}
        postId={commentPostId}
      />

      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        onUpdateComment={handleUpdateComment}
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
                onAddComment={openAddCommentDialog}
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
