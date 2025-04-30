import { Comment } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

interface UpdateCommentRequest {
  id: number
  body: string
}

export const updateComment = async ({ id, body }: UpdateCommentRequest): Promise<Comment> => {
  try {
    const response = await axiosInstance.put(`/comments/${id}`, { body })
    return response.data
  } catch (error) {
    throw new Error("댓글 업데이트 실패")
  }
}
