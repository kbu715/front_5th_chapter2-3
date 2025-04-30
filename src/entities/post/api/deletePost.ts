import { axiosInstance } from "../../../shared/lib/axios"

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/posts/${id}`)
  } catch (error) {
    throw new Error("게시물 삭제 실패")
  }
}
