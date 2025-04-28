import { User } from "../../user/model/types"

export interface Comment {
  id: number
  body: string
  postId: number | null
  likes: number
  user: User
  userId?: User["id"]
}
