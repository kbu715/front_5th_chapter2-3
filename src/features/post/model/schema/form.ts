import { z } from "zod"

export const addPostFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  body: z.string().min(1, "내용을 입력해주세요."),
  userId: z.coerce.number().int().min(1, "유효한 사용자 ID를 입력해주세요."),
})

export const editPostFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  body: z.string().min(1, "내용을 입력해주세요."),
})
