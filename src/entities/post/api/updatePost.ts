import { Post } from "../model/types"

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })

  if (!response.ok) {
    throw new Error("게시물 업데이트 실패")
  }

  const data: Post = await response.json()

  return data
}
