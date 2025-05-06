import { Tag } from "@entities/post/model/types"
import { axiosInstance } from "@shared/lib/axios"

export const fetchPostTags = async (): Promise<Tag[]> => {
  try {
    const response = await axiosInstance.get("/posts/tags")
    return response.data
  } catch (error) {
    throw new Error("게시물 태그 불러오기 실패")
  }
}
