import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "@shared/lib/types"
import { updateComment } from "@entities/comment/api"
import { Comment } from "@entities/comment/model/types"

interface UpdateCommentRequest {
  id: number
  body: string
}

export const useUpdateCommentMutation = (
  options?: CustomMutationOptions<Comment, AxiosError, UpdateCommentRequest>,
) => {
  return useMutation<Comment, AxiosError, UpdateCommentRequest>({
    mutationFn: updateComment,
    ...options,
  })
}
