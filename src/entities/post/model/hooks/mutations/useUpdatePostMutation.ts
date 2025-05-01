import { useMutation } from "@tanstack/react-query"
import { updatePost } from "../../../api"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "../../../../../shared/lib/types"
import { Post } from "../../types"

export const useUpdatePostMutation = (options?: CustomMutationOptions<Post, AxiosError, Post>) => {
  return useMutation<Post, AxiosError, Post>({
    mutationFn: updatePost,
    ...options,
  })
}
