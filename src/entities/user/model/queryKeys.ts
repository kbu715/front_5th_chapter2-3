export const userQueryKeys = {
  all: "users" as const,
  list: () => [userQueryKeys.all] as const,
  detail: (id: number) => [userQueryKeys.all, "detail", id] as const,
}
