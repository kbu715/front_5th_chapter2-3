import { DefaultOptions } from "@tanstack/react-query"

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 600000,
    gcTime: 900000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  },
}
