import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "@shared/lib/types"
import { deletePost } from "@entities/post/api"

export const useDeletePostMutation = (options?: CustomMutationOptions<void, AxiosError, number>) => {
  return useMutation<void, AxiosError, number>({
    mutationFn: deletePost,
    ...options,
  })
}
