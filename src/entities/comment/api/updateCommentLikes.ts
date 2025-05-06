import { Comment } from "@entities/comment/model/types"
import { axiosInstance } from "@shared/lib/axios"

interface UpdateCommentLikesRequest {
  id: number
  likes: number
}

export const updateCommentLikes = async ({ id, likes }: UpdateCommentLikesRequest): Promise<Comment> => {
  try {
    const response = await axiosInstance.patch(`/comments/${id}`, { likes })
    return response.data
  } catch (error) {
    throw new Error("댓글 좋아요 실패")
  }
}
