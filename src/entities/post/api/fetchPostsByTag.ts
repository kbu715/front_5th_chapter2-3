import { PostsResponse } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

export const fetchPostsByTag = async (tag: string): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get(`/posts/tag/${encodeURIComponent(tag)}`)
    return response.data
  } catch (error) {
    throw new Error("태그별 게시물 불러오기 실패")
  }
}
