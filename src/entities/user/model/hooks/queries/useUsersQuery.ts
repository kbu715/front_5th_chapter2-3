import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PromiseResolvedReturnType } from "@shared/lib/types"
import { CustomQueryOptions } from "@shared/lib/types"
import { fetchUsers } from "@entities/user/api"
import { userQueryKeys } from "@entities/user/model/queryKeys"

type QueryFnData = PromiseResolvedReturnType<typeof fetchUsers>

export const useUsersQuery = <QueryData = QueryFnData>(
  options?: CustomQueryOptions<QueryFnData, AxiosError, QueryData>,
) => {
  return useQuery({
    queryKey: userQueryKeys.list(),
    queryFn: fetchUsers,
    ...options,
  })
}
