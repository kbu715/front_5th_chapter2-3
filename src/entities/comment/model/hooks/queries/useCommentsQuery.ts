import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PromiseResolvedReturnType } from "@shared/lib/types"
import { fetchComments } from "@entities/comment/api"
import { CustomQueryOptions } from "@shared/lib/types"
import { commentQueryKeys } from "@entities/comment/model/queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof fetchComments>

export const useCommentsQuery = <QueryData = QueryFnData>(
  postId: number,
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: commentQueryKeys.byPost(postId),
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    ...options,
  })
}
