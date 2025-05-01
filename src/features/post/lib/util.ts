import { Post } from "../../../entities/post/model/types"

export const intersectPostsById = (...postArrays: (Post[] | undefined)[]) => {
  if (postArrays.length === 0) return []

  return postArrays
    .filter((arr): arr is Post[] => !!arr)
    .reduce((acc, curr) => acc.filter((post) => curr.some((p) => p.id === post.id)), postArrays[0] || [])
}
