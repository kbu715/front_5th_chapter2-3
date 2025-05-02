import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PromiseResolvedReturnType } from "../../../../../shared/lib/types"
import { fetchUserById } from "../../../api"
import { CustomQueryOptions } from "../../../../../shared/lib/types"
import { userQueryKeys } from "../../queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof fetchUserById>

export const useUserQuery = <QueryData = QueryFnData>(
  id: number,
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    ...options,
  })
}
