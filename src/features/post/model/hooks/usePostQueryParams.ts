import { useSearchParams } from "react-router-dom"

interface QueryParams {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
}

export function usePostQueryParams(initialParams?: Partial<QueryParams>) {
  const [searchParams, setSearchParams] = useSearchParams()

  const skip = parseInt(searchParams.get("skip") || initialParams?.skip?.toString() || "0")
  const limit = parseInt(searchParams.get("limit") || initialParams?.limit?.toString() || "10")
  const search = searchParams.get("search") || initialParams?.search || ""
  const sortBy = searchParams.get("sortBy") || initialParams?.sortBy || ""
  const sortOrder = (searchParams.get("sortOrder") || initialParams?.sortOrder || "asc") as "asc" | "desc"
  const tag = searchParams.get("tag") || initialParams?.tag || ""

  const updateURL = () => {
    const newParams = new URLSearchParams(searchParams)

    if (skip) newParams.set("skip", skip.toString())
    else newParams.delete("skip")

    if (limit !== 10) newParams.set("limit", limit.toString())
    else newParams.delete("limit")

    if (search) newParams.set("search", search)
    else newParams.delete("search")

    if (sortBy) newParams.set("sortBy", sortBy)
    else newParams.delete("sortBy")

    if (sortOrder !== "asc") newParams.set("sortOrder", sortOrder)
    else newParams.delete("sortOrder")

    if (tag) newParams.set("tag", tag)
    else newParams.delete("tag")

    setSearchParams(newParams, { replace: true })
  }

  const setSkip = (newSkip: number) => {
    const newParams = new URLSearchParams(searchParams)
    if (newSkip > 0) newParams.set("skip", newSkip.toString())
    else newParams.delete("skip")
    setSearchParams(newParams, { replace: true })
  }

  const setLimit = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams)
    if (newLimit !== 10) newParams.set("limit", newLimit.toString())
    else newParams.delete("limit")
    setSearchParams(newParams, { replace: true })
  }

  const setSearch = (newSearch: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (newSearch) newParams.set("search", newSearch)
    else newParams.delete("search")
    setSearchParams(newParams, { replace: true })
  }

  const setSortBy = (newSortBy: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (newSortBy) newParams.set("sortBy", newSortBy)
    else newParams.delete("sortBy")
    setSearchParams(newParams, { replace: true })
  }

  const setSortOrder = (newSortOrder: "asc" | "desc") => {
    const newParams = new URLSearchParams(searchParams)
    if (newSortOrder !== "asc") newParams.set("sortOrder", newSortOrder)
    else newParams.delete("sortOrder")
    setSearchParams(newParams, { replace: true })
  }

  const setTag = (newTag: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (newTag) newParams.set("tag", newTag)
    else newParams.delete("tag")
    setSearchParams(newParams, { replace: true })
  }

  return {
    params: { skip, limit, search, sortBy, sortOrder, tag },
    setters: { setSkip, setLimit, setSearch, setSortBy, setSortOrder, setTag },
    updateURL,
  }
}
