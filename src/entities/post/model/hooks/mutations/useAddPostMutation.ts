import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "@shared/lib/types"
import { Post } from "@entities/post/model/types"
import { addPost } from "@entities/post/api"

interface AddPostRequest {
  title: string
  body: string
  userId: number
}

export const useAddPostMutation = (options?: CustomMutationOptions<Post, AxiosError, AddPostRequest>) => {
  return useMutation<Post, AxiosError, AddPostRequest>({
    mutationFn: addPost,
    ...options,
  })
}
