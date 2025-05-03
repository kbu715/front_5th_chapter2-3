import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { defaultQueryOptions } from "../../config/constants"

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: defaultQueryOptions,
  })

export const TestQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
