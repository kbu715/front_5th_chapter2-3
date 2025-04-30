import { Comment } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get(`/comments/post/${postId}`)
    return response.data.comments
  } catch (error) {
    throw new Error("댓글 불러오기 실패")
  }
}
