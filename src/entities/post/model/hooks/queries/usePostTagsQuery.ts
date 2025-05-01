import { useQuery } from "@tanstack/react-query"
import { fetchPostTags } from "../../../api"
import { postQueryKeys } from "../../queryKeys"
import { AxiosError } from "axios"
import { CustomQueryOptions } from "../../../../../shared/lib/types"
import { PromiseResolvedReturnType } from "../../../../../shared/lib/types"

type QueryFnData = PromiseResolvedReturnType<typeof fetchPostTags>

export const usePostTagsQuery = <QueryData = QueryFnData>(
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: postQueryKeys.tags(),
    queryFn: fetchPostTags,
    ...options,
  })
}
