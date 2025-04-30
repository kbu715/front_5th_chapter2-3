import { User } from "../model/types"
import { axiosInstance } from "../../../shared/lib/axios"

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error("사용자 상세 정보 불러오기 실패")
  }
}
