import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { fetchPosts } from "../../../api"
import { CustomQueryOptions } from "../../../../../shared/lib/types"
import { PromiseResolvedReturnType } from "../../../../../shared/lib/types"
import { postQueryKeys } from "../../queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof fetchPosts>

interface UsePostsQueryParams {
  limit: number
  skip: number
}

export const usePostsQuery = <QueryData = QueryFnData>(
  params: UsePostsQueryParams,
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => fetchPosts(params),
    ...options,
  })
}
