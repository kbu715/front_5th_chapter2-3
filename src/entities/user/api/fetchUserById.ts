import { User } from "../model/types"

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)

  if (!response.ok) {
    throw new Error("사용자 상세 정보 불러오기 실패")
  }

  const userData: User = await response.json()

  return userData
}
