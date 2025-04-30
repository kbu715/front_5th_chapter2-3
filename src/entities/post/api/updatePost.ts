import { Post } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  try {
    const response = await axiosInstance.put(`/posts/${updatedPost.id}`, updatedPost)
    return response.data
  } catch (error) {
    throw new Error("게시물 업데이트 실패")
  }
}
