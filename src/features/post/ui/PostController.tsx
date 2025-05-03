import { usePostQueryParams } from "../model/hooks"
import { PostSearchInput } from "./PostSearchInput"
import { PostSortBySelect } from "./PostSortBySelect"
import { PostSortSelect } from "./PostSortSelect"
import { PostTagFilter } from "./PostTagFilter"

export const PostController = () => {
  const { params, setters } = usePostQueryParams()
  const { sortBy, sortOrder, tag } = params
  const { setSortBy, setSortOrder, setTag } = setters

  return (
    <div className="flex gap-4">
      <PostSearchInput />
      <PostTagFilter selectedTag={tag} onSelectTag={setTag} />
      <PostSortBySelect value={sortBy} onChange={setSortBy} />
      <PostSortSelect value={sortOrder} onChange={(value) => setSortOrder(value as "asc" | "desc")} />
    </div>
  )
}
