import { PostsResponse } from "../model/types"

export const fetchPostsByTag = async (tag: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/tag/${encodeURIComponent(tag)}`)

  if (!response.ok) {
    throw new Error("태그별 게시물 불러오기 실패")
  }

  const data: PostsResponse = await response.json()

  return data
}
