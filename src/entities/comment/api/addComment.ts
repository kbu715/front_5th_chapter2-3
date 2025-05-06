import { Comment } from "@entities/comment/model/types"
import { axiosInstance } from "@shared/lib/axios"

type AddCommentRequest = Pick<Comment, "body" | "postId" | "userId">

export const addComment = async (newComment: AddCommentRequest): Promise<Comment> => {
  try {
    const response = await axiosInstance.post("/comments/add", newComment)
    return response.data
  } catch (error) {
    throw new Error("댓글 추가 실패")
  }
}
