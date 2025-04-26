import { PostsResponse } from "../model/types"

interface FetchPostsOptions {
  limit: number
  skip: number
}

export const fetchPosts = async ({ limit, skip }: FetchPostsOptions): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error("게시물 불러오기 실패")
  }

  const data: PostsResponse = await response.json()
  return data
}
