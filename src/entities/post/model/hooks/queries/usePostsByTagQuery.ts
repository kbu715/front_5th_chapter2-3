import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PromiseResolvedReturnType } from "@shared/lib/types"
import { CustomQueryOptions } from "@shared/lib/types"
import { fetchPostsByTag } from "@entities/post/api"
import { postQueryKeys } from "@entities/post/model/queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof fetchPostsByTag>

export const usePostsByTagQuery = <QueryData = QueryFnData>(
  tag: string,
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: postQueryKeys.listByTag(tag),
    queryFn: () => fetchPostsByTag(tag),
    enabled: !!tag && tag !== "all",
    ...options,
  })
}
