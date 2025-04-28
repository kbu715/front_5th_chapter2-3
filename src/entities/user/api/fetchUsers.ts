import { UsersResponse } from "../model/types"

export const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")

  if (!response.ok) {
    throw new Error("사용자 정보 불러오기 실패")
  }

  const data: UsersResponse = await response.json()

  return data
}
