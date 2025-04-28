import { Comment } from "../model/types"

type AddCommentRequest = Pick<Comment, "body" | "postId" | "userId">

export const addComment = async (newComment: AddCommentRequest): Promise<Comment> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })

  if (!response.ok) {
    throw new Error("댓글 추가 실패")
  }

  const data: Comment = await response.json()

  return data
}
