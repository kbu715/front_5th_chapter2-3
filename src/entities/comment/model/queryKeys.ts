export const commentQueryKeys = {
  all: "comments" as const,
  byPost: (postId: number) => [commentQueryKeys.all, "byPost", postId] as const,
}
