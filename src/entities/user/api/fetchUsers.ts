import { UsersResponse } from "@entities/user/model/types"
import { axiosInstance } from "@shared/lib/axios"

export const fetchUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await axiosInstance.get("/users?limit=0&select=username,image")
    return response.data
  } catch (error) {
    throw new Error("사용자 정보 불러오기 실패")
  }
}
