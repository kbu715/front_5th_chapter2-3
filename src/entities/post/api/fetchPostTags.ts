import { Tag } from "../model/types"

export const fetchPostTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")

  if (!response.ok) {
    throw new Error("게시물 태그 불러오기 실패")
  }

  const data: Tag[] = await response.json()

  return data
}
