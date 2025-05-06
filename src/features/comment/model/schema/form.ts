import { z } from "zod"

export const addCommentFormSchema = z.object({
  body: z.string().min(1, "댓글 내용을 입력해주세요."),
  userId: z.coerce.number().int().min(1, "유효한 사용자 ID를 입력해주세요."),
})

export const editCommentFormSchema = z.object({
  body: z.string().min(1, "댓글 내용을 입력해주세요."),
})
