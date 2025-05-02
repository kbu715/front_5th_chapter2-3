import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomMutationOptions } from "../../../../../shared/lib/types"
import { addComment } from "../../../api"
import { Comment } from "../../types"

type AddCommentRequest = Pick<Comment, "body" | "postId" | "userId">

export const useAddCommentMutation = (options?: CustomMutationOptions<Comment, AxiosError, AddCommentRequest>) => {
  return useMutation<Comment, AxiosError, AddCommentRequest>({
    mutationFn: addComment,
    ...options,
  })
}
