import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { updateCommentLikes } from "../../../api/updateCommentLikes"
import { CustomMutationOptions } from "../../../../../shared/lib/types"
import { Comment } from "../../../model/types"

interface UpdateCommentLikesRequest {
  id: number
  likes: number
}

export const useUpdateCommentLikesMutation = (
  options?: CustomMutationOptions<Comment, AxiosError, UpdateCommentLikesRequest>,
) => {
  return useMutation<Comment, AxiosError, UpdateCommentLikesRequest>({
    mutationFn: ({ id, likes }) => updateCommentLikes({ id, likes }),
    ...options,
  })
}
