import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { CustomQueryOptions } from "@shared/lib/types"
import { searchPosts } from "@entities/post/api"
import { PromiseResolvedReturnType } from "@shared/lib/types"
import { postQueryKeys } from "@entities/post/model/queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof searchPosts>

export const useSearchPostsQuery = <QueryData = QueryFnData>(
  query: string,
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: postQueryKeys.search(query),
    queryFn: () => searchPosts(query),
    enabled: !!query,
    ...options,
  })
}
