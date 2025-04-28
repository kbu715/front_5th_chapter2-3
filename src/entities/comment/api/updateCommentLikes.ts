import { Comment } from "../model/types"

interface UpdateCommentLikesRequest {
  id: number
  likes: number
}

export const updateCommentLikes = async ({ id, likes }: UpdateCommentLikesRequest): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })

  if (!response.ok) {
    throw new Error("댓글 좋아요 실패")
  }

  const data: Comment = await response.json()

  return data
}
