import { Post } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

interface AddPostRequest {
  title: string
  body: string
  userId: number
}

export const addPost = async (newPost: AddPostRequest): Promise<Post> => {
  try {
    const response = await axiosInstance.post("/posts/add", newPost)
    return response.data
  } catch (error) {
    throw new Error("게시물 추가 실패")
  }
}
