import { PostsResponse } from "../model/types"

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error("게시물 검색 실패")
  }

  const data: PostsResponse = await response.json()

  return data
}
