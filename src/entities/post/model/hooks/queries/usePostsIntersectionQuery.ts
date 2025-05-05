import { usePostsQuery } from "./usePostsQuery"
import { useSearchPostsQuery } from "./useSearchPostsQuery"
import { usePostsByTagQuery } from "./usePostsByTagQuery"
import { useMemo } from "react"
import { intersectPostsById } from "../../../../../features/post/lib/util"
import { keepPreviousData } from "@tanstack/react-query"

export const usePostsIntersectionQuery = ({
  search,
  tag,
  limit,
  skip,
}: {
  search: string
  tag: string
  limit: number
  skip: number
}) => {
  const { data: allPosts, isLoading: isAllLoading } = usePostsQuery(
    { limit, skip },
    {
      placeholderData: keepPreviousData,
    },
  )
  const { data: searchPosts, isLoading: isSearchLoading } = useSearchPostsQuery(search)
  const { data: tagPosts, isLoading: isTagLoading } = usePostsByTagQuery(tag)

  const posts = useMemo(() => {
    return intersectPostsById(
      allPosts?.posts,
      search ? searchPosts?.posts : undefined,
      tag && tag !== "all" ? tagPosts?.posts : undefined,
    )
  }, [allPosts?.posts, searchPosts?.posts, tagPosts?.posts, search, tag])

  const total = useMemo(() => {
    return allPosts?.total
  }, [allPosts])

  return {
    posts,
    isLoading: isAllLoading || isSearchLoading || isTagLoading,
    total,
  }
}
