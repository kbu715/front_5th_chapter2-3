import { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

export type CustomQueryOptions<QueryFnData, QueryError = AxiosError, QueryData = QueryFnData> = Partial<
  Omit<UseQueryOptions<QueryFnData, QueryError, QueryData>, "queryKey" | "queryFn">
>

export type CustomMutationOptions<
  MutationFnData,
  MutationError = AxiosError,
  MutationVariable = void,
  MutationContext = unknown,
> = Partial<Omit<UseMutationOptions<MutationFnData, MutationError, MutationVariable, MutationContext>, "mutationFn">>
