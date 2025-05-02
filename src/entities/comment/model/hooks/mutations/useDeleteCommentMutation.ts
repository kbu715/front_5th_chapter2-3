import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "../../../../../shared/lib/types"
import { deleteComment } from "../../../api/deleteComment"

export const useDeleteCommentMutation = (options?: CustomMutationOptions<void, AxiosError, number>) => {
  return useMutation<void, AxiosError, number>({
    mutationFn: (id) => deleteComment(id),
    ...options,
  })
}
