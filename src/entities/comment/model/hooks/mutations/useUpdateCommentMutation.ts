import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "../../../../../shared/lib/types"
import { updateComment } from "../../../api"
import { Comment } from "../../types"

interface UpdateCommentRequest {
    id: number
    body: string
  }

export const useUpdateCommentMutation = (
  options?: CustomMutationOptions<Comment, AxiosError, UpdateCommentRequest>
) => {
  return useMutation<Comment, AxiosError, UpdateCommentRequest>({
    mutationFn: updateComment,    
    ...options,
  })
}
