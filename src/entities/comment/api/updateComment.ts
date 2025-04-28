import { Comment } from "../model/types"

interface UpdateCommentRequest {
  id: number
  body: string
}

export const updateComment = async ({ id, body }: UpdateCommentRequest): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })

  if (!response.ok) {
    throw new Error("댓글 업데이트 실패")
  }

  const data: Comment = await response.json()

  return data
}
