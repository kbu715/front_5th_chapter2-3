import { axiosInstance } from "@shared/lib/axios"

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${id}`)
  } catch (error) {
    throw new Error("댓글 삭제 실패")
  }
}
