import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PromiseResolvedReturnType } from "../../../../../shared/lib/types"
import { CustomQueryOptions } from "../../../../../shared/lib/types"
import { fetchUsers } from "../../../api"
import { userQueryKeys } from "../../queryKeys"

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
