import { Comment } from "../model/types"

interface CommentsResponse {
  comments: Comment[]
}

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`/api/comments/post/${postId}`)

  if (!response.ok) {
    throw new Error("댓글 불러오기 실패")
  }

  const data: CommentsResponse = await response.json()
  return data.comments
}
