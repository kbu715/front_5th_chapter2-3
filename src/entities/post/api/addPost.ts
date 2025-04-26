import { Post } from "../model/types"

interface AddPostRequest {
  title: string
  body: string
  userId: number
}

export const addPost = async (newPost: AddPostRequest): Promise<Post> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })

  if (!response.ok) {
    throw new Error("게시물 추가 실패")
  }

  const data: Post = await response.json()

  return data
}
