import { PostsResponse } from "@entities/post/model/types"
import { axiosInstance } from "@shared/lib/axios"

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get(`/posts/search?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (error) {
    throw new Error("게시물 검색 실패")
  }
}
