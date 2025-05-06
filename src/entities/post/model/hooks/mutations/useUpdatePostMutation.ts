import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "@shared/lib/types"
import { Post } from "@entities/post/model/types"
import { updatePost } from "@entities/post/api"

export const useUpdatePostMutation = (options?: CustomMutationOptions<Post, AxiosError, Post>) => {
  return useMutation<Post, AxiosError, Post>({
    mutationFn: updatePost,
    ...options,
  })
}
