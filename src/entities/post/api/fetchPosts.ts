import { PostsResponse } from "@entities/post/model/types"
import { axiosInstance } from "@shared/lib/axios"

interface FetchPostsOptions {
  limit: number
  skip: number
}

export const fetchPosts = async ({ limit, skip }: FetchPostsOptions): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get(`/posts`, {
      params: { limit, skip },
    })
    return response.data
  } catch (error) {
    throw new Error("게시물 불러오기 실패")
  }
}
