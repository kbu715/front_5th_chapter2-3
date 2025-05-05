import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { fetchPosts } from "../../../api"
import { CustomQueryOptions } from "../../../../../shared/lib/types"
import { PromiseResolvedReturnType } from "../../../../../shared/lib/types"
import { postQueryKeys } from "../../queryKeys"
import { useEffect } from "react"
import { usePostQueryParams } from "../../../../../features/post/model/hooks"

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

export const usePrefetchPostsQuery = () => {
  const queryClient = useQueryClient()
  const { params } = usePostQueryParams()
  const { limit, skip } = params

  useEffect(() => {
    const currentLimit = limit ?? 10
    const nextSkip = skip + currentLimit

    const nextParams = { skip: nextSkip, limit: currentLimit }

    queryClient.prefetchQuery<QueryFnData, AxiosError>({
      queryKey: postQueryKeys.list(nextParams),
      queryFn: () => fetchPosts(nextParams),
    })
  }, [limit, skip, queryClient])
}
