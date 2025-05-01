export const postQueryKeys = {
  all: "posts" as const,
  listAll: () => [postQueryKeys.all] as const,
  list: (params: { limit: number; skip: number }) => [postQueryKeys.all, "list", params] as const,
  listByTag: (tag: string) => [postQueryKeys.all, "list", "tag", tag] as const,
  tags: () => [postQueryKeys.all, "tags"] as const,
  search: (query: string) => [postQueryKeys.all, "search", query] as const,
}
